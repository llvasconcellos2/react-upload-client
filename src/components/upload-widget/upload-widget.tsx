import { useState } from "react";
import { UploadWidgetDropZone } from "./upload-widget-dropzone";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";
import { AnimateHeight } from "../ui/animate-height";
import { UploadWidgetHeader } from "./upload-widget-header";

export function UploadWidget() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="bg-zinc-900 rounded-xl shape-shadow overflow-hidden"
    >
      <UploadWidgetHeader />

      <AnimateHeight
        isVisible={isOpen}
        variants={{
          closed: {
            width: 240,
            height: 0,
            transition: { duration: 0.2, type: "keyframes" },
          },
          open: { width: 360, height: "auto", transition: { duration: 0.1 } },
        }}
      >
        <div className="flex flex-col gap-4 py-3">
          <UploadWidgetDropZone />
          <div className="h-px bg-zinc-800 border-t border-black/50 box-content"></div>
          <UploadWidgetUploadList />
        </div>
      </AnimateHeight>
    </div>
  );
}
