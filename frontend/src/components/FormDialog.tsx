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


// State and handler fucntion to close dialog from parent component:
// const [isFormDialogOpen, setIsFormDialogOpen] = useState(false); //state for closing FormDialog upon succesfull form submission
//handler for closing FormDialog child component when form is succesfully submitted.
// const handleFormDialogClose = (state: boolean) => {
//   setIsFormDialogOpen(state);
// };
//In addition, make sure the onSubmit of the form that is FOrmDialog's child has a matching fn signature to handleFormDialogClose
//interface ChildFormProps {
//  onFormSubmit: (state: boolean) => void;
//}

export default function FormDialog({
  isOpen,
  onFormSubmissionCloseDialog,
  title,
  description,
  formComponent,
}: FormDialogProps) 
{
  //debugging
  // console.log("3) FormDialog isOpen:", isOpen)
  return (
    // debugging
      <Dialog open={isOpen} onOpenChange={ onFormSubmissionCloseDialog }> 
    {/* <Dialog open={isOpen} onOpenChange={(newState: boolean) => { 
       console.log("6) onOpenChange triggered with state:", newState); 
       onFormSubmissionCloseDialog(newState); 
     }}> */}
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
