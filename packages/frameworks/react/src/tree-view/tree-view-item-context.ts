import { createContext } from '../create-context'

export interface ItemProps {
  id: string
  disabled?: boolean
}

export interface TreeViewItemContext extends ItemProps {
  depth: number
}

export const [TreeViewItemProvider, useTreeViewItemContext] = createContext<TreeViewItemContext>({
  name: 'TreeViewItemContext',
  hookName: 'useTreeViewItemContext',
  providerName: '<TreeViewItemProvider />',
})
