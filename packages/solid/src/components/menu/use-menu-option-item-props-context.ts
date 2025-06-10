import { createContext } from '../../utils/create-context'

interface BaseItemProps {
  checked?: boolean
  value?: string
}

export const [MenuItemPropsProvider, useMenuItemPropsContext] = createContext<BaseItemProps>({
  hookName: 'useMenuItemPropsContext',
  providerName: '<MenuItemPropsProvider />',
})
