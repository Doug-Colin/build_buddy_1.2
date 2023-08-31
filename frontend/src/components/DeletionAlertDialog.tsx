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
} from "@/components/ui/alert-dialog";

// Use: In parent component, pass a <button> or <Button> with preferred props/styling as value of button prop

interface DeletionAlertDialogProps {
  button: React.ReactNode;
  alertDialogTitle: string;
  alertDialogDescription: string;
  alertDialogAction: string;
  onDelete: () => void;
}

export default function DeletionAlertDialog({
  button,
  alertDialogTitle,
  alertDialogDescription,
  alertDialogAction,
  onDelete,
}: DeletionAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {button}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertDialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertDialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>
            {alertDialogAction}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
