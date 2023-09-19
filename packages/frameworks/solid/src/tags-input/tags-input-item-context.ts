import { createContext } from '../create-context'

export interface ItemProps {
  index: string | number
  value: string
  disabled?: boolean
}
export interface ItemState {
  id: string
  isEditing: boolean
  isHighlighted: boolean
  isDisabled: boolean
}

export type TagsInputItemContext = ItemProps

export const [TagsInputItemProvider, useTagsInputItemContext] = createContext<TagsInputItemContext>(
  {
    hookName: 'useTagsInputItemContext',
    providerName: '<TagsInputItemProvider />',
  },
)
