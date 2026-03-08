import * as Progress from "@radix-ui/react-progress";
import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react";
import { Button } from "../ui/button";
import { useUploads, type Upload } from "../../store/uploads";
import { formatFileSize } from "../../utils/format-file-size";

interface UploadItemProps {
  upload: Upload;
  uploadId: string;
}

export function UploadWidgetUploadItem({ upload, uploadId }: UploadItemProps) {
  const cancelUpload = useUploads((state) => state.cancelUpload);
  return (
    <div className="p-3 rounded-lg flex flex-col gap-3 shape-content-shadow relative overflow-hidden">
      <div className="flex flex-col gap-1">
        <span className="text-xxs font-medium flex items-center gap-1">
          <ImageUp className="size-3 text-zinc-300" />
          <span>{upload.name}</span>
        </span>
        <div className="text-xxs text-zinc-400 flex gap-1.5 items-center">
          <span className="line-through">
            {formatFileSize(upload.file.size)}
          </span>
          <span className="size-1 rounded-full bg-zinc-700" />
          <span>
            300 KB
            <span className="text-green-400 ml-1">-94%</span>
          </span>
          <span className="size-1 rounded-full bg-zinc-700" />
          {(upload.status === "progress" || upload.status === "success") && (
            <span>45%</span>
          )}
          {upload.status === "error" && (
            <span className="text-red-700">Erro</span>
          )}
          {upload.status === "canceled" && (
            <span className="text-yellow-600">Cancelado</span>
          )}
        </div>
      </div>

      <Progress.Root className="bg-zinc-800 rounded-full h-1 overflow-hidden">
        <Progress.Indicator
          data-status={upload.status}
          className="bg-indigo-500 h-1 data-[status=success]:bg-green-400 data-[status=canceled]:bg-yellow-600 data-[status=error]:bg-red-700"
          style={{ width: upload.status === "progress" ? "43%" : "100%" }}
        />
      </Progress.Root>

      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <Button
          title="Download da imagem comprimida"
          size="icon-sm"
          disabled={upload.status !== "success"}
        >
          <Download className="size-3" />
          <span className="sr-only">Download da imagem comprimida</span>
        </Button>

        <Button
          title="Copiar URL da Imagem"
          size="icon-sm"
          disabled={upload.status !== "success"}
        >
          <Link2 className="size-3" />
          <span className="sr-only">Copiar URL da Imagem</span>
        </Button>

        <Button
          title="Tentar novamente o upload"
          size="icon-sm"
          disabled={!["canceled", "error"].includes(upload.status)}
        >
          <RefreshCcw className="size-3" />
          <span className="sr-only">Tentar novamente o upload</span>
        </Button>

        <Button
          title="Cancelar o upload"
          size="icon-sm"
          disabled={upload.status !== "progress"}
          onClick={() => cancelUpload(uploadId)}
        >
          <X className="size-3" />
          <span className="sr-only">Cancelar o upload</span>
        </Button>
      </div>
    </div>
  );
}
