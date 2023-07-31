import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react";

interface FormDialogProps {
title: string;
description: string;
formComponent: ReactNode;
submitButtonText: string
} 

export default function FormDialog({ title, description, formComponent, submitButtonText }: FormDialogProps) {
    return (
      <Dialog>
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
          <DialogFooter>
            <Button type="submit">{submitButtonText}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  