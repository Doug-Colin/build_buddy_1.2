import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface FormDialogProps {
  isOpen: boolean
  onFormSubmissionCloseDialog: (state: boolean) => void
  title: string
  description: string
  formComponent: React.ReactNode
}

/*  
For use in parent component:
 
State for closing FormDialog upon succesfull form submission
 const { isFormDialogOpen, handleFormDialogClose } = useFormDialogState(false);

Handler for closing FormDialog child component when form is succesfully submitted.
 const handleFormDialogClose = (state: boolean) => {
   setIsFormDialogOpen(state);
 };

Note on typing:  make sure the onSubmit of the form rendered by FormDialog has fn signature type that matches handleFormDialogClose
interface ChildFormProps {
  onFormSubmit: (state: boolean) => void;
}
*/
export default function FormDialog({
  isOpen,
  onFormSubmissionCloseDialog,
  title,
  description,
  formComponent,
}: FormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onFormSubmissionCloseDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
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
  )
}
