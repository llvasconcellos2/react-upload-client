import { useState } from "react";
import { UploadWidgetDropZone } from "./upload-widget-dropzone";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";
import { AnimateHeight } from "../ui/animate-height";
import { UploadWidgetHeader } from "./upload-widget-header";

export function UploadWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const hasPendingUploads = true;

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      data-progress={hasPendingUploads}
      className="bg-zinc-900 overflow-hidden rounded-xl data-[state=open]:shadow-shape border border-transparent animate-border data-[state=closed]:rounded-3xl data-[state=closed]:data-[progress=false]:shadow-shape  data-[state=closed]:data-[progress=true]:[background:linear-gradient(45deg,#09090B,--theme(--color-zinc-900)_50%,#09090B)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-zinc-700/.48)_80%,--theme(--color-indigo-500)_86%,--theme(--color-indigo-300)_90%,--theme(--color-indigo-500)_94%,--theme(--color-zinc-600/.48))_border-box]"
    >
      <UploadWidgetHeader onClick={() => setIsOpen(!isOpen)} />
      <AnimateHeight
        isVisible={isOpen}
        variants={{
          closed: {
            width: 240,
            opacity: 0,
            height: 0,
            transition: {
              duration: 0.2,
              type: "keyframes",
            },
          },
          open: {
            opacity: 1,
            width: 360,
            height: "auto",
            transition: { duration: 0.2 },
          },
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
