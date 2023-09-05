import { useState } from "react";

export const useFormDialogState = (initialState: boolean) => {

    const [isFormDialogOpen, setIsFormDialogOpen] = useState(initialState)
    const handleFormDialogClose = (state: boolean) => setIsFormDialogOpen(state)
    
    return {isFormDialogOpen, handleFormDialogClose} 
}


