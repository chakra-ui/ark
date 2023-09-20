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

export type SegmentGroupItemContext = ItemProps

export const [SegmentProvider, useSegmentGroupItemContext] = createContext<SegmentGroupItemContext>(
  {
    hookName: 'useSegmentGroupItemContext',
    providerName: '<SegmentProvider />',
  },
)
