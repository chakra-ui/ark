import type { ItemProps } from '@zag-js/cascade-select'
import { createContext } from '../../utils/create-context'

export interface UseCascadeSelectItemPropsContext extends ItemProps {}

export const [CascadeSelectItemPropsProvider, useCascadeSelectItemPropsContext] =
  createContext<UseCascadeSelectItemPropsContext>('CascadeSelectItemPropsContext')
