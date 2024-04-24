import type { connect } from '@zag-js/checkbox'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseCheckboxContext extends ComputedRef<ReturnType<typeof connect>> {}

export const [CheckboxProvider, useCheckboxContext] =
  createContext<UseCheckboxContext>('CheckboxContext')
