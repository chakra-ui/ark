import type { ItemGroupProps } from '@zag-js/select'
import { createContext } from '../../utils'

export interface UseSelectItemGroupPropsContext extends ItemGroupProps {}

export const [SelectItemGroupPropsProvider, useSelectItemGroupPropsContext] =
  createContext<UseSelectItemGroupPropsContext>('SelectItemGroupPropsContext')
