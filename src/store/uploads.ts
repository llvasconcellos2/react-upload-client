import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import { enableMapSet } from "immer";
import { uploadFileToStorage } from "../http/upload-file-to-storage";
import { CanceledError } from "axios";

export type Upload = {
  name: string;
  file: File;
  abortController: AbortController;
  status: "progress" | "success" | "error" | "canceled";
  originalByteSize: number;
  bytesSent: number;
};

type UploadsState = {
  uploads: Map<string, Upload>;
  addUploads: (files: File[]) => void;
  cancelUpload: (uploadId: string) => void;
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

      let status: "progress" | "success" | "error" | "canceled" = "progress";
      try {
        await uploadFileToStorage(
          {
            file: upload.file,
            onProgress: (numBytes) => {
              updateUpload(uploadId, {
                status: "progress",
                bytesSent: numBytes,
              });
            },
          },
          { signal: upload.abortController.signal },
        );
        status = "success";
      } catch (error) {
        //TODO: handle errors
        if (error instanceof CanceledError) {
          status = "canceled";
        } else {
          status = "error";
        }
      } finally {
        updateUpload(uploadId, {
          status: status,
        });
      }
    }

    function cancelUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId);

      if (!upload) return;

      upload.abortController.abort();

      updateUpload(uploadId, {
        status: "canceled",
      });
    }

    function addUploads(files: File[]) {
      for (const file of files) {
        const uploadId = crypto.randomUUID();
        const abortController = new AbortController();

        const upload: Upload = {
          name: file.name,
          file,
          abortController,
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

    return {
      uploads: new Map(),
      addUploads,
      cancelUpload,
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
        (accumulator, upload, index, array) => {
          accumulator.total += upload.originalByteSize;
          accumulator.uploaded += upload.bytesSent;

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
