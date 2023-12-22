import type { ItemProps } from '@zag-js/select'
import { createContext } from '../context'

export interface SelectItemContext extends ItemProps {}

export const [SelectItemProvider, useSelectItemContext] =
  createContext<SelectItemContext>('SelectItemContext')
