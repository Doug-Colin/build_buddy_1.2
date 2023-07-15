import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"

/*Redux in TS:
  Use following functions throughout app instead of plain `useDispatch` and `useSelector.`
  These pre-typed versions of useDispatch and useSelector hooks can now be imported into any component file that needs them
*/
type DispatchFunc = () => AppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector