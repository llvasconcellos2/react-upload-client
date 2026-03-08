import Axios from "axios";

interface UploadFileToStorageParams {
  file: File;
  onProgress: (numBytes: number) => void;
}

interface UploadFileToStorageOptions {
  signal?: AbortSignal;
}

export async function uploadFileToStorage(
  { file, onProgress }: UploadFileToStorageParams,
  options?: UploadFileToStorageOptions,
) {
  const data = new FormData();
  data.append("file", file);
  const response = await Axios.post<{ url: string }>(
    "http://localhost:3333/uploads",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: options?.signal,
      onUploadProgress: (progressEvent) => {
        onProgress(progressEvent.loaded);
      },
    },
  );
  return { url: response.data.url };
}
