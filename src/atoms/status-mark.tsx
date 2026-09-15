import { cn } from "@/common/utils";
import type { DecisionStatus } from "@/common/types";

export function StatusMark({
  status,
  animate = false,
}: {
  status: DecisionStatus;
  animate?: boolean;
}) {
  return (
    <span className={cn("status-mark", `status-${status}`, animate && "status-stamp-enter")}>
      {status}
    </span>
  );
}
