import type { connect } from '@zag-js/dialog'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'
import type { UseDialogReturn } from './use-dialog'

export const [DialogProvider, useDialogContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('DialogContext')

export type DialogContext = UseDialogReturn
