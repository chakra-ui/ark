import { createContext } from '../../utils/context'
import type { UseDialogReturn } from './use-dialog'

export interface DialogContext extends UseDialogReturn {}

export const [DialogProvider, useDialogContext] = createContext<DialogContext>('DialogContext')
