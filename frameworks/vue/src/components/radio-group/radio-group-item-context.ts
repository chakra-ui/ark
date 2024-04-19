import type { ItemProps } from '@zag-js/radio-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface RadioGroupItemContext extends ComputedRef<ItemProps> {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<RadioGroupItemContext>('RadioGroupItemContext')
