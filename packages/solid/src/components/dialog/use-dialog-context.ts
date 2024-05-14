import { createContext } from '../../utils/create-context'
import type { UseDialogReturn } from './use-dialog'

export interface UseDialogContext extends UseDialogReturn {}

export const [DialogProvider, useDialogContext] = createContext<UseDialogContext>({
  hookName: 'useDialogContext',
  providerName: '<DialogProvider />',
})
