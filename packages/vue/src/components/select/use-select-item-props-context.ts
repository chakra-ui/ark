import type { ItemProps } from '@zag-js/select'
import { createContext } from '../../utils/create-context.ts'

export interface UseSelectItemPropsContext extends ItemProps {}

export const [SelectItemPropsProvider, useSelectItemPropsContext] =
  createContext<UseSelectItemPropsContext>('SelectItemPropsContext')
