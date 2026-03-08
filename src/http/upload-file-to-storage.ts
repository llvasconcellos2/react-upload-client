import Axios from "axios";

interface UploadFileToStorageParams {
  file: File;
}

interface UploadFileToStorageOptions {
  signal?: AbortSignal;
}

export async function uploadFileToStorage(
  { file }: UploadFileToStorageParams,
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
    },
  );
  throw new Error();
  return { url: response.data.url };
}
