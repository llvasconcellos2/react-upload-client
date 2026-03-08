import { useUploads } from "../../store/uploads";
import { UploadWidgetUploadItem } from "./upload-widget-upload-item";

export function UploadWidgetUploadList() {
  const uploads = useUploads((store) => store.uploads);
  const isEmpty = uploads.size === 0;

  return (
    <div className="px-3 flex flex-col gap-3 text-xs">
      <span className=" font-medium">
        Arquivos Enviados{" "}
        <span className="text-zinc-400">({uploads.size})</span>
      </span>

      {isEmpty ? (
        <span className="text-zinc-400">Nenhum upload adicionado.</span>
      ) : (
        <div className="space-y-2">
          {Array.from(uploads.entries()).map(([uploadId, upload]) => {
            return (
              <UploadWidgetUploadItem
                key={uploadId}
                upload={upload}
                uploadId={uploadId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
