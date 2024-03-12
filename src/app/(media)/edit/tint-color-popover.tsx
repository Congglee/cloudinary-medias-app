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
import { SettingData, Transform } from "./page";
import { Dispatch, SetStateAction } from "react";

export function TintColorPopover({
  handleTransform,
  handleSettings,
  amount,
  color1,
  color2,
}: {
  handleTransform: (value: Transform) => void;
  handleSettings: Dispatch<SetStateAction<SettingData>>;
  amount: string;
  color1: string;
  color2: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button onClick={() => handleTransform("tint")}>
            Set Tint Color
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Apply Tint Color</h4>
              <p className="text-sm text-muted-foreground">
                Blends an image with one or more tint colors at a specified
                intensity.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    handleSettings((prevSettings) => ({
                      ...prevSettings,
                      amount: e.target.value,
                    }));
                  }}
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="color1">Color 1</Label>
                <Select
                  onValueChange={(value) =>
                    handleSettings((prevSettings) => ({
                      ...prevSettings,
                      color1: value,
                    }))
                  }
                  defaultValue={color1}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose color 1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yellow">Yellow</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="color2">Color 2</Label>
                <Select
                  onValueChange={(value) =>
                    handleSettings((prevSettings) => ({
                      ...prevSettings,
                      color1: value,
                    }))
                  }
                  defaultValue={color2}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose color 2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="greenyellow">Lime Green</SelectItem>
                    <SelectItem value="blueviolet">Blue Violet</SelectItem>
                    <SelectItem value="redblack">Maroon</SelectItem>
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
