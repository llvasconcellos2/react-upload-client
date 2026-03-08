import { useDropzone } from "react-dropzone";
import CircularProgressBar from "../ui/circular-progress-bar";
import { usePendingUploads, useUploads } from "../../store/uploads";

export function UploadWidgetDropZone() {
  const { hasPendingUploads, globalUploadPercentage } = usePendingUploads();
  const addUploads = useUploads((store) => store.addUploads);
  const numUploads = useUploads((store) => store.uploads.size);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: {
      //'image/jpeg': ['.jpg', '.jpeg'],
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles, fileRejections, event) => {
      addUploads(acceptedFiles);
    },
  });

  return (
    <div className="px-3 text-xs text-zinc-400 flex flex-col gap-3">
      <div
        data-active={isDragActive}
        className=" cursor-pointer bg-black/20 p-5 rounded-lg border border-zinc-700 
          border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-500 transition-colors
        data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500
          "
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />

        {hasPendingUploads ? (
          <div className="flex flex-col gap-2.5 items-center">
            <CircularProgressBar
              progress={globalUploadPercentage}
              size={80}
              strokeWidth={6}
            />
            <span>Enviando {numUploads} arquivos...</span>
          </div>
        ) : (
          <>
            {" "}
            <span>Arraste e solte imagens aqui ou </span>
            <span className=" underline">
              clique para selecionar os arquivos
            </span>
          </>
        )}
      </div>
      <span className="text-xxs text-zinc-400">Apenas arquivos PNG e JPG.</span>
    </div>
  );
}
