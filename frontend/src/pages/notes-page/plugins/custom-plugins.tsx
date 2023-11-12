// Custom plugin to handle debounced automatic saving of notes.  
const debouncedSavePlugin  = (editor) => {
    const {onChange} = editor
    editor.onChange = (value) => {
        //implement debouncing here
        debounce(() => {

        })
    }
}