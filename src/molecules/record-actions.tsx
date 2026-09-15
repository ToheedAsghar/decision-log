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
  onDelete,
  onSupersede,
}: {
  status: DecisionStatus;
  disabled?: boolean;
  onDelete: () => void;
  onSupersede: (trigger: HTMLButtonElement) => void;
}) {
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
            Delete decision
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="confirm-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this decision?</AlertDialogTitle>
            <AlertDialogDescription>
              The record will be removed for the rest of this demo session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep decision</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete decision</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
