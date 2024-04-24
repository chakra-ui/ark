import type { ItemState } from '@zag-js/radio-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseRadioGroupItemContext extends ComputedRef<ItemState> {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<UseRadioGroupItemContext>('RadioGroupItemContext')
