import { createContext } from '../../utils'
import type { UseBottomSheetReturn } from './use-bottom-sheet'

export interface UseBottomSheetContext extends UseBottomSheetReturn {}
export const [BottomSheetProvider, useBottomSheetContext] = createContext<UseBottomSheetContext>('BottomSheetContext')
