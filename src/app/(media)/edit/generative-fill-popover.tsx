import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { SettingData, Transform } from "./page";
import { gravities } from "@/utils/data";

export function GenerativeFillPopover({
  handleTransform,
  handleSettings,
  prompt,
  gravity,
}: {
  handleTransform: (value: Transform) => void;
  handleSettings: Dispatch<SetStateAction<SettingData>>;
  prompt: string;
  gravity?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button onClick={() => handleTransform("generative-fill")}>
            Generative Fill
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-96">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">
                Apply AI Generative Fill
              </h4>
              <p className="text-sm text-muted-foreground space-y-1">
                Generative fill, utilized with various cropping methods, uses AI
                to expand original images, aiding in orientation changes.
                <br />
                <span className="font-semibold text-white">
                  (Generative Fill is currently in beta.)
                </span>
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="prompt">Prompt</Label>
                <Input
                  id="prompt"
                  value={prompt}
                  onChange={(e) => {
                    handleSettings((prevSettings) => ({
                      ...prevSettings,
                      prompt: e.target.value,
                    }));
                  }}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="gravity">Gravity</Label>
                <Select
                  onValueChange={(value) =>
                    handleSettings((prevSettings) => ({
                      ...prevSettings,
                      gravity: value,
                    }))
                  }
                  defaultValue={gravity}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose graivity positions for crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {gravities.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
