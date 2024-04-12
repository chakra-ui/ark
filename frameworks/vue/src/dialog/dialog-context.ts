import { createContext } from '../context'
import type { UseDialogReturn } from './use-dialog'

export interface DialogContext extends UseDialogReturn {}

export const [DialogProvider, useDialogContext] = createContext<DialogContext>('DialogContext')
