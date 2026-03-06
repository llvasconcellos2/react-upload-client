import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { motion, useCycle } from "motion/react";

import { UploadWidgetDropZone } from "./upload-widget-dropzone";
import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";
import { UploadWidgetMinimized } from "./upload-widget-minimized";
import { AnimateHeight } from "../ui/animate-height";
import { UploadWidgetTitle } from "./upload-widget-title";
import { Button } from "../ui/button";
import { Minimize2 } from "lucide-react";

export function UploadWidget() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* <Collapsible.Root open={isOpen} onOpenChange={() => toggleOpen()}> */}
      {/* <motion.div
        className="bg-zinc-900 w-[360px] rounded-xl shape-shadow overflow-hidden"
        variants={{
          closed: {
            width: "max-content",
            height: 44,
            transition: { duration: 0.2, type: "keyframes" },
          },
          open: { width: 360, height: "auto", transition: { duration: 0.1 } },
        }}
        animate={isOpen ? "open" : "closed"} */}

      {
        // initial={{ height: 44 /* opacity: 0 */ }}
        // animate={{
        //   height: isOpen ? "calc-size(auto)" : 44,
        //   //opacity: isOpen ? 1 : 0,
        // }}
        // transition={{ duration: 0.5 }}
        // style={{ overflow: "hidden" }}
        // exit={{ height: 44 }}
      }
      {/* > */}
      {/* {!isOpen && <UploadWidgetHeader />} */}
      {/* <UploadWidgetHeader /> */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900 rounded-xl shape-shadow overflow-hidden"
      >
        <div className="w-full p-4 py-2 bg-white/2 border-zinc-800 border-b flex items-center justify-between cursor-pointer gap-5">
          <UploadWidgetTitle />
          <Button size="icon" className="-mr-2">
            <Minimize2 /* strokeWidth={1.5} */ className="size-4" />
          </Button>
        </div>

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
          {/* <Collapsible.Content> */}
          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropZone />
            <div className="h-px bg-zinc-800 border-t border-black/50 box-content"></div>
            <UploadWidgetUploadList />
          </div>
          {/* </Collapsible.Content> */}
        </AnimateHeight>
      </div>
      {/* </motion.div> */}
      {/* </Collapsible.Root> */}
    </>
  );
}
