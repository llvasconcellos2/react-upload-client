import * as Progress from "@radix-ui/react-progress";
import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react";
import { Button } from "../ui/button";

export function UploadWidgetUploadItem() {
  return (
    <div className="p-3 rounded-lg flex flex-col gap-3 shape-content-shadow relative overflow-hidden">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium flex items-center gap-1">
          <ImageUp className="size-3 text-zinc-300" />
          <span>screenshot.png</span>
        </span>
        <div className="text-xxs text-zinc-400 flex gap-1.5 items-center">
          <span className="line-through">3 MB</span>
          <span className="size-1 rounded-full bg-zinc-700" />
          <span>
            300 KB
            <span className="text-green-400 ml-1">-94%</span>
          </span>
          <span className="size-1 rounded-full bg-zinc-700" />
          <span>45%</span>
        </div>
      </div>

      <Progress.Root className="bg-zinc-800 rounded-full h-1 overflow-hidden">
        <Progress.Indicator
          className="bg-indigo-500 h-1"
          style={{ width: "43%" }}
        />
      </Progress.Root>

      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <Button title="Download da imagem comprimida" size="icon-sm">
          <Download className="size-4" />
          <span className="sr-only">Download da imagem comprimida</span>
        </Button>

        <Button title="Copiar URL da Imagem" size="icon-sm">
          <Link2 className="size-4" />
          <span className="sr-only">Copiar URL da Imagem</span>
        </Button>

        <Button title="Tentar novamente o upload" size="icon-sm">
          <RefreshCcw className="size-4" />
          <span className="sr-only">Tentar novamente o upload</span>
        </Button>

        <Button title="Cancelar o upload" size="icon-sm">
          <X className="size-4" />
          <span className="sr-only">Cancelar o upload</span>
        </Button>
      </div>
    </div>
  );
}
