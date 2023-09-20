import type { ComputedRef } from 'vue'
import { createContext } from '../context'

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

export type TagsInputItemContext = ComputedRef<ItemProps>

export const [TagsInputItemProvider, useTagsInputItemContext] =
  createContext<TagsInputItemContext>('TagsInputItemContext')
