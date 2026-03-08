import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import { enableMapSet } from "immer";
import { uploadFileToStorage } from "../http/upload-file-to-storage";
import { CanceledError } from "axios";
import { compressImage } from "../utils/compress-image";

export type Upload = {
  name: string;
  file: File;
  abortController?: AbortController;
  status: "progress" | "success" | "error" | "canceled";
  originalByteSize: number;
  compressedByteSize?: number;
  bytesSent: number;
  remoteUrl?: string;
};

type UploadsState = {
  uploads: Map<string, Upload>;
  addUploads: (files: File[]) => void;
  cancelUpload: (uploadId: string) => void;
  retryUpload: (uploadId: string) => void;
};

enableMapSet();

export const useUploads = create<UploadsState, [["zustand/immer", never]]>(
  immer((set, get) => {
    function updateUpload(uploadId: string, data: Partial<Upload>) {
      const upload = get().uploads.get(uploadId);

      if (!upload) return;

      set((state) => {
        state.uploads.set(uploadId, { ...upload, ...data });
      });
    }

    async function proccessUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId);

      if (!upload) return;

      const abortController = new AbortController();

      updateUpload(uploadId, {
        status: "progress",
        bytesSent: 0,
        remoteUrl: undefined,
        compressedByteSize: undefined,
        abortController,
      });

      try {
        const compressedFile = await compressImage({
          file: upload.file,
          maxWidth: 1000,
          maxHeight: 1000,
          quality: 0.8,
        });

        updateUpload(uploadId, {
          compressedByteSize: compressedFile.size,
        });

        const { url } = await uploadFileToStorage(
          {
            file: compressedFile,
            onProgress: (numBytes) => {
              updateUpload(uploadId, {
                status: "progress",
                bytesSent: numBytes,
              });
            },
          },
          { signal: abortController.signal },
        );
        updateUpload(uploadId, {
          status: "success",
          remoteUrl: url,
        });
      } catch (error) {
        //TODO: handle errors
        if (error instanceof CanceledError) {
          updateUpload(uploadId, {
            status: "canceled",
          });
        } else {
          updateUpload(uploadId, {
            status: "error",
          });
        }
      }
    }

    function cancelUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId);

      if (!upload) return;

      upload.abortController?.abort();

      updateUpload(uploadId, {
        status: "canceled",
      });
    }

    function addUploads(files: File[]) {
      for (const file of files) {
        const uploadId = crypto.randomUUID();

        const upload: Upload = {
          name: file.name,
          file,
          status: "progress",
          originalByteSize: file.size,
          bytesSent: 0,
        };
        set((state) => {
          state.uploads.set(uploadId, upload);
        });
        proccessUpload(uploadId);
      }
    }

    function retryUpload(uploadId: string) {
      proccessUpload(uploadId);
    }

    return {
      uploads: new Map(),
      addUploads,
      cancelUpload,
      retryUpload,
    };
  }),
);

export const usePendingUploads = () => {
  return useUploads(
    useShallow((store) => {
      const hasPendingUploads = Array.from(store.uploads.values()).some(
        (upload) => upload.status === "progress",
      );

      if (!hasPendingUploads) {
        return { hasPendingUploads, globalUploadPercentage: 100 };
      }

      const { total, uploaded } = Array.from(store.uploads.values()).reduce(
        (accumulator, upload) => {
          if (upload.compressedByteSize) {
            accumulator.uploaded += upload.bytesSent;
          }
          accumulator.total +=
            upload.compressedByteSize || upload.originalByteSize;
          return accumulator;
        },
        { total: 0, uploaded: 0 },
      );

      const globalUploadPercentage = Math.min(
        Math.round((uploaded * 100) / total),
        100,
      );

      return { hasPendingUploads, globalUploadPercentage };
    }),
  );
};
