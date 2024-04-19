import type { ItemProps } from '@zag-js/radio-group'
import type { Ref } from 'vue'
import { createContext } from '../../utils'

export interface UseRadioGroupItemPropsContext extends Ref<ItemProps> {}

export const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] =
  createContext<UseRadioGroupItemPropsContext>('RadioGroupItemPropsContext')
