import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SettingData, Transform } from "./page";
import { Dispatch, SetStateAction } from "react";

export function OpacityPopover({
  handleTransform,
  handleSettings,
  opacity,
}: {
  handleTransform: (value: Transform) => void;
  handleSettings: Dispatch<SetStateAction<SettingData>>;
  opacity: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button onClick={() => handleTransform("opacity")}>
            Apply Opacity
          </Button>
        </PopoverTrigger>

        <PopoverContent className="flex flex-col gap-3">
          <Label htmlFor="opacity">Opacity</Label>
          <Input
            id="opacity"
            type="number"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => {
              handleSettings((prevSettings) => ({
                ...prevSettings,
                opacity: e.target.value,
              }));
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
