import { createContext } from '../../utils/create-context'

export interface BaseItemProps {
  checked?: boolean
  value: string
}

export const [MenuItemPropsProvider, useMenuItemPropsContext] = createContext<BaseItemProps>({
  name: 'MenuItemPropsContext',
  hookName: 'useMenuItemPropsContext',
  providerName: '<MenuItemPropsProvider />',
})
