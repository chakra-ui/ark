import type { ItemProps } from '@zag-js/select'
import { createContext } from '~/utils/context'

export interface SelectItemContext extends ItemProps {}

export const [SelectItemProvider, useSelectItemContext] =
  createContext<SelectItemContext>('SelectItemContext')
