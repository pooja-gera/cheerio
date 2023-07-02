import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { Button } from "@/components/ui/button";
import GeneralTable from "./general-table";
import { useAtom } from "jotai";
import { viewPdfAtom } from "@/jotai/viewpdf";

export default function GeneralDisclosures() {
  const [selected, setSelected] = React.useState(1);
  const [viewPdf, setViewPdf] = useAtom(viewPdfAtom);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="link">Select Questions:</Button> {selected}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-[500px] overflow-y-auto">
          {Array.from({ length: 24 }).map((_, i) => (
            <>
              <DropdownMenuItem
                onClick={() => setSelected(i + 1)}
                key={i}
                className="px-2 py-1 hover:bg-gray-100"
              >
                {i + 1}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mt-4">
        <GeneralTable id={selected} />
      </div>
    </>
  );
}
