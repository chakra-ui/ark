import { createContext } from '../../utils/create-context'
import type { UseBottomSheetReturn } from './use-bottom-sheet'

export interface UseBottomSheetContext extends UseBottomSheetReturn {}

export const [BottomSheetProvider, useBottomSheetContext] = createContext<UseBottomSheetContext>({
  hookName: 'useBottomSheetContext',
  providerName: '<BottomSheetProvider />',
})
