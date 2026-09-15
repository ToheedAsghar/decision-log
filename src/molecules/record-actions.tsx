import { Button } from "@/atoms/button";
import type { DecisionStatus } from "@/common/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/molecules/ui/alert-dialog";

export function RecordActions({
  status,
  disabled = false,
  onArchive,
  onDelete,
  onSupersede,
}: {
  status: DecisionStatus;
  disabled?: boolean;
  onArchive?: () => void;
  onDelete?: () => void;
  onSupersede: (trigger: HTMLButtonElement) => void;
}) {
  const handleArchive = onArchive ?? onDelete;
  return (
    <>
      {status === "active" ? (
        <Button
          disabled={disabled}
          variant="ghost"
          onClick={(event) => onSupersede(event.currentTarget)}
        >
          Supersede decision
        </Button>
      ) : null}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={disabled} variant="ghost">
            Archive decision
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="confirm-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Archive this decision?</AlertDialogTitle>
            <AlertDialogDescription>
              Archiving hides this record from the active log for this session without erasing its
              history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep decision</AlertDialogCancel>
            <AlertDialogAction onClick={handleArchive}>Archive decision</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
