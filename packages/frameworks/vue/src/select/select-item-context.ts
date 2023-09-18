import type { ItemProps } from '@zag-js/select'
import { createContext } from '../context'

export type SelectItemContext = ItemProps
export const [SelectItemProvider, useSelectItemContext] =
  createContext<SelectItemContext>('SelectItemContext')
