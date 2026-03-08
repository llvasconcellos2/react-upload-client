import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { uploadFileToStorage } from "../http/upload-file-to-storage";

export type Upload = {
  name: string;
  file: File;
  abortController: AbortController;
  status: "progress" | "success" | "error" | "canceled";
};

type UploadsState = {
  uploads: Map<string, Upload>;
  addUploads: (files: File[]) => void;
  cancelUpload: (uploadId: string) => void;
};

enableMapSet();

export const useUploads = create<UploadsState, [["zustand/immer", never]]>(
  immer((set, get) => {
    async function proccessUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId);

      if (!upload) return;

      let status: "progress" | "success" | "error" | "canceled" = "progress";
      try {
        await uploadFileToStorage(
          { file: upload.file },
          { signal: upload.abortController.signal },
        );
        status = "success";
      } catch (error) {
        status = "error";
      } finally {
        set((state) => {
          state.uploads.set(uploadId, {
            ...upload,
            status: status,
          });
        });
      }
    }

    function cancelUpload(uploadId: string) {
      const upload = get().uploads.get(uploadId);

      if (!upload) return;

      upload.abortController.abort();

      set((state) => {
        state.uploads.set(uploadId, {
          ...upload,
          status: "canceled",
        });
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
