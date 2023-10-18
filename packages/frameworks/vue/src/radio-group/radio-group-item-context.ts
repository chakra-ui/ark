import type { ItemProps } from '@zag-js/radio-group'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export type RadioGroupItemContext = ComputedRef<ItemProps>

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<RadioGroupItemContext>('RadioGroupItemContext')
