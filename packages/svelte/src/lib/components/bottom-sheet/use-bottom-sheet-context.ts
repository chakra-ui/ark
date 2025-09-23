import { createContext } from '$lib/utils/create-context'
import type { UseBottomSheetReturn } from './use-bottom-sheet.svelte'

export interface UseBottomSheetContext extends UseBottomSheetReturn {}
export const [BottomSheetProvider, useBottomSheetContext] = createContext<UseBottomSheetContext>({
  name: 'BottomSheetContext',
})
