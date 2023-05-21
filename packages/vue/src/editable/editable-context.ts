import { type connect } from '@zag-js/editable'
import { type ComputedRef, type UnwrapRef } from 'vue'
import { createContext } from '../context'
import { type UseEditableReturn } from './use-editable'

export const [EditableProvider, useEditableContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('EditableContext')

export type EditableContext = UnwrapRef<UseEditableReturn>
