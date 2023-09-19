import { createContext } from '../create-context'

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

export type RadioGroupItemContext = ItemProps

export const [RadioProvider, useRadioGroupItemContext] = createContext<RadioGroupItemContext>({
  hookName: 'useRadioGroupItemContext',
  providerName: '<RadioProvider />',
})
