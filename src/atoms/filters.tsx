import { Button } from "./button";
import type { DecisionStatus } from "@/common/types";

export type StatusFilter = DecisionStatus | "all";

export function Filters({
  value,
  onChange,
  disabled = false,
}: {
  value: StatusFilter;
  disabled?: boolean;
  onChange?: (value: StatusFilter) => void;
}) {
  const options: StatusFilter[] = ["all", "active", "superseded"];
  return (
    <div className="filters" role="group" aria-label="Filter decisions">
      {options.map((option) => (
        <Button
          key={option}
          disabled={disabled}
          type="button"
          variant="ghost"
          aria-pressed={value === option}
          onClick={() => onChange?.(option)}
        >
          {option[0]?.toUpperCase()}
          {option.slice(1)}
        </Button>
      ))}
    </div>
  );
}
