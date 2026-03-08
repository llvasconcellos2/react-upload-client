import { UploadCloud } from "lucide-react";
import { usePendingUploads } from "../../store/uploads";

export function UploadWidgetTitle() {
  const { hasPendingUploads, globalUploadPercentage } = usePendingUploads();
  return (
    <div className="text-xs font-medium flex items-center gap-1.5">
      <UploadCloud className="size-4 text-zinc-400" />
      {hasPendingUploads ? (
        <>
          Enviando Arquivos
          <span className="text-zinc-400 tabular-nums">
            {globalUploadPercentage}%
          </span>
        </>
      ) : (
        <>Upload de Arquivos</>
      )}
    </div>
  );
}
