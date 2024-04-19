import type { ItemProps } from '@zag-js/select'
import { createContext } from '../../utils'

export interface UseSelectItemContext extends ItemProps {}

export const [SelectItemProvider, useSelectItemContext] =
  createContext<UseSelectItemContext>('SelectItemContext')
