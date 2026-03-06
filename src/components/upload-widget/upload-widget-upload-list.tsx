import { UploadWidgetUploadItem } from "./upload-widget-upload-item";

export function UploadWidgetUploadList() {
  const isEmpty = false;

  return (
    <div className="px-3 flex flex-col gap-3 text-xs">
      <span className=" font-medium">
        Arquivos Enviados <span className="text-zinc-400">(2)</span>
      </span>

      {isEmpty ? (
        <span className="text-zinc-400">Nenhum upload adicionado.</span>
      ) : (
        <div className="space-y-2">
          <UploadWidgetUploadItem />
          <UploadWidgetUploadItem />
          <UploadWidgetUploadItem />
        </div>
      )}
    </div>
  );
}
