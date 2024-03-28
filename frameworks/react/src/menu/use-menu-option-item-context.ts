import type { OptionItemProps, OptionItemState } from '@zag-js/menu'
import { createContext } from '../create-context'

export interface UseMenuOptionItemContext extends OptionItemState {}

export const [MenuOptionItemProvider, useMenuOptionItemContext] =
  createContext<UseMenuOptionItemContext>({
    name: 'MenuOptionItemContext',
    hookName: 'useMenuOptionItemContext',
    providerName: '<MenuOptionItemProvider />',
  })

export const [MenuOptionItemPropsProvider, useMenuOptionItemPropsContext] =
  createContext<OptionItemProps>({
    name: 'MenuOptionItemPropsContext',
    hookName: 'useMenuOptionItemPropsContext',
    providerName: '<MenuOptionItemPropsProvider />',
  })
