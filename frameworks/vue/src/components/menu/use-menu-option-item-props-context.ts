import type { OptionItemProps } from '@zag-js/menu'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export const [MenuOptionItemPropsProvider, useMenuOptionItemPropsContext] = createContext<
  ComputedRef<OptionItemProps>
>('MenuOptionItemPropsContext')
