import type { OptionItemProps } from '@zag-js/menu'
import { createContext } from '../create-context'

export const [MenuOptionItemPropsProvider, useMenuOptionItemPropsContext] =
  createContext<OptionItemProps>({
    name: 'MenuOptionItemPropsContext',
    hookName: 'useMenuOptionItemPropsContext',
    providerName: '<MenuOptionItemPropsProvider />',
  })
