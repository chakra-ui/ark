import type { OptionItemProps } from '@zag-js/menu'
import { createContext } from '../../utils/create-context'

export const [MenuOptionItemPropsProvider, useMenuOptionItemPropsContext] = createContext<OptionItemProps>({
  hookName: 'useMenuOptionItemPropsContext',
  providerName: '<MenuOptionItemPropsProvider />',
})
