import { createContext } from '../create-context'
import { type UseDialogReturn } from './use-dialog'

export interface DialogContext extends UseDialogReturn {}

export const [DialogProvider, useDialogContext] = createContext<DialogContext>({
  name: 'DialogContext',
  hookName: 'useDialogContext',
  providerName: '<DialogProvider />',
})
