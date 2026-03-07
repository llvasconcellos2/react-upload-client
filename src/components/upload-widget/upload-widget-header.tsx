import { Minimize2 } from "lucide-react";
import { Button } from "../ui/button";
import { UploadWidgetTitle } from "./upload-widget-title";
import type { ClassAttributes, HTMLAttributes } from "react";
import type { JSX } from "react/jsx-runtime";

export function UploadWidgetHeader(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>,
) {
  return (
    <div
      {...props}
      className="w-full p-4 py-2 bg-white/2 border-zinc-800 border-b flex items-center justify-between cursor-pointer gap-5"
    >
      <UploadWidgetTitle />
      <Button size="icon" className="-mr-2">
        <Minimize2 className="size-4" />
      </Button>
    </div>
  );
}
