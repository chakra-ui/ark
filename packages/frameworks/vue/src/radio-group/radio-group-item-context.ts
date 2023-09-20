import type { ComputedRef } from 'vue'
import { createContext } from '../context'

// TODO export in zag.js
export interface ItemProps {
  value: string
  disabled?: boolean
  invalid?: boolean
}

export interface ItemState {
  isInvalid: boolean
  isDisabled: boolean
  isChecked: boolean
  isFocused: boolean
  isHovered: boolean
  isActive: boolean
}

export type RadioGroupItemContext = ComputedRef<ItemProps>

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<RadioGroupItemContext>('RadioGroupItemContext')
