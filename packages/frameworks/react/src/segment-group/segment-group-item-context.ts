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

export interface SegmentGroupItemContext extends ItemProps {}

export const [SegmentGroupItemProvider, useSegmentGroupItemContext] =
  createContext<SegmentGroupItemContext>({
    name: 'SegmentGroupItemContext',
    hookName: 'useSegmentGroupItemContext',
    providerName: '<SegmentGroupItemProvider />',
  })
