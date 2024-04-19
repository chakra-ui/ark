import type { ItemProps } from '@zag-js/select'
import type { Ref } from 'vue'
import { createContext } from '../../utils'

export interface UseSelectItemPropsContext extends Ref<ItemProps> {}

export const [SelectItemPropsProvider, useSelectItemPropsContext] =
  createContext<UseSelectItemPropsContext>('SelectItemPropsContext')
