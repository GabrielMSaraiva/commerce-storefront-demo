"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type CartQuantitySelectProps = {
  value: number;
  ariaLabel: string;
  className?: string;
  onValueChange: (quantity: number) => void;
};

const quantityOptions = Array.from({ length: 10 }, (_, index) => index + 1);

export function CartQuantitySelect({
  ariaLabel,
  className,
  onValueChange,
  value,
}: CartQuantitySelectProps) {
  return (
    <Select
      value={String(value)}
      onValueChange={(nextValue) => onValueChange(Number(nextValue))}
    >
      <SelectTrigger
        size="default"
        className={cn(
          "w-20 rounded-xl border-0 bg-muted px-4 font-semibold data-[size=default]:h-12",
          className,
        )}
        aria-label={ariaLabel}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="min-w-20">
        {quantityOptions.map((quantity) => (
          <SelectItem key={quantity} value={String(quantity)}>
            {quantity}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
