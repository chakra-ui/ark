import type { ReactNode } from 'react'
import { type UseBottomSheetContext, useBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetContextProps {
  children: (context: UseBottomSheetContext) => ReactNode
}

export const BottomSheetContext = (props: BottomSheetContextProps) => props.children(useBottomSheetContext())
