import type { OptionItemProps } from '@zag-js/menu'
import { createContext } from '../../utils'

export const [MenuOptionItemPropsProvider, useMenuOptionItemPropsContext] =
  createContext<OptionItemProps>('MenuOptionItemPropsContext')
