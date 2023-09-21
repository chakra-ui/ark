import { createContext } from '../create-context'

// TODO export in zag.js
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

export interface TagsInputItemContext extends ItemProps {}

export const [TagsInputItemProvider, useTagsInputItemContext] = createContext<TagsInputItemContext>(
  {
    name: 'TagsInputItemContext',
    hookName: 'useTagsInputItemContext',
    providerName: '<TagsInputItemProvider />',
  },
)
