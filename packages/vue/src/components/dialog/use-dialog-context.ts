import { createContext } from '../../utils'
import type { UseDialogReturn } from './use-dialog'

export interface UseDialogContext extends UseDialogReturn {}

export const [DialogProvider, useDialogContext] = createContext<UseDialogContext>('DialogContext')
