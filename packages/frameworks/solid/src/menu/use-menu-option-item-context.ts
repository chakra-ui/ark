import type { OptionItemProps, OptionItemState } from '@zag-js/menu'
import type { Accessor } from 'solid-js'
import { createContext } from '../create-context'

export interface UseMenuOptionItemContext extends Accessor<OptionItemState> {}

export const [MenuOptionItemProvider, useMenuOptionItemContext] =
  createContext<UseMenuOptionItemContext>({
    hookName: 'useMenuOptionItemContext',
    providerName: '<MenuOptionItemProvider />',
  })

export const [MenuOptionItemPropsProvider, useMenuOptionItemPropsContext] =
  createContext<OptionItemProps>({
    hookName: 'useMenuOptionItemPropsContext',
    providerName: '<MenuOptionItemPropsProvider />',
  })
