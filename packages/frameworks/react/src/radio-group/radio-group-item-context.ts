import { createContext } from '../create-context'

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

export interface RadioGroupItemContext extends ItemProps {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<RadioGroupItemContext>({
    name: 'RadioGroupItemContext',
    hookName: 'useRadioGroupItemContext',
    providerName: '<RadioGroupItemProvider />',
  })
