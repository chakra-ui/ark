import { type connect } from '@zag-js/editable'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'
import { type UseEditableReturn } from './use-editable'

export const [EditableProvider, useEditableContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('EditableContext')

export type EditableContext = UseEditableReturn
