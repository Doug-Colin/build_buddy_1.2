import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FormDialogProps {
  isOpen: boolean;
  onFormSubmissionCloseDialog: (state: boolean) => void;
  title: string;
  description: string;
  formComponent: React.ReactNode;
}

export default function FormDialog({
  isOpen,
  onFormSubmissionCloseDialog,
  title,
  description,
  formComponent,
}: FormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={ onFormSubmissionCloseDialog }>
      <DialogTrigger asChild>
        <Button variant="outline">
          {/* <PlusIcon className="mr-2 h-4 w-4" /> */}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {formComponent}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
