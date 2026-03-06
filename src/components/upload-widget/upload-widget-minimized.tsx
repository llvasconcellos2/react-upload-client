import * as Collapsible from "@radix-ui/react-collapsible";
import { Maximize2 } from "lucide-react";
import { Button } from "../ui/button";
import { UploadWidgetTitle } from "./upload-widget-title";

export function UploadWidgetMinimized() {
  return (
    // <Collapsible.Trigger className="group w-full bg-white/2 py-3 px-5 flex items-center justify-between gap-5">
    //   <span className="text-sm font-medium">Upload de Arquivos</span>
    //   <Maximize2 className="size-4 text-zinc-400 group-hover:text-zinc-100" />
    // </Collapsible.Trigger>
    <Collapsible.Trigger asChild>
      <div className="w-full p-4 py-2 bg-white/2 border-zinc-800 border-b flex items-center justify-between cursor-pointer gap-5">
        <UploadWidgetTitle />
        <Button size="icon" className="-mr-2">
          <Maximize2 /* strokeWidth={1.5} */ className="size-4" />
        </Button>
      </div>
    </Collapsible.Trigger>
  );
}
