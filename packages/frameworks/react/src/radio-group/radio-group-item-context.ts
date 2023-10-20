import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '../create-context'

// export interface ItemState {
//   isInvalid: boolean
//   isDisabled: boolean
//   isChecked: boolean
//   isFocused: boolean
//   isHovered: boolean
//   isActive: boolean
// }

export interface RadioGroupItemContext extends ItemProps {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<RadioGroupItemContext>({
    name: 'RadioGroupItemContext',
    hookName: 'useRadioGroupItemContext',
    providerName: '<RadioGroupItemProvider />',
  })
