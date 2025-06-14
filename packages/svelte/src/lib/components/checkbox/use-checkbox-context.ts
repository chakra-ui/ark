import { getContext, setContext } from 'svelte'
import type { UseCheckboxReturn } from './use-checkbox.svelte'

const CHECKBOX_CONTEXT_KEY = Symbol('CheckboxContext')

export type UseCheckboxContext = UseCheckboxReturn

export const CheckboxProvider = (context: UseCheckboxContext) => {
  setContext(CHECKBOX_CONTEXT_KEY, context)
}

export const useCheckboxContext = (): UseCheckboxContext => {
  const context = getContext<UseCheckboxContext>(CHECKBOX_CONTEXT_KEY)
  if (!context) {
    throw new Error('useCheckboxContext must be used within a CheckboxProvider')
  }
  return context
}
