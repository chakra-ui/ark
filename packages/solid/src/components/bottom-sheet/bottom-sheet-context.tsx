import type { JSX } from 'solid-js'
import { type UseBottomSheetContext, useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetContextProps {
  children: (context: UseBottomSheetContext) => JSX.Element
}

export const BottomSheetContext = (props: BottomSheetContextProps) => props.children(useBottomSheetContext())
