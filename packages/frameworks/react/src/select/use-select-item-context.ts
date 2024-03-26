import type { ItemProps } from '@zag-js/select'
import { createContext } from '../create-context'

export interface UseSelectItemContext extends ItemProps {}

export const [SelectItemProvider, useSelectItemContext] = createContext<UseSelectItemContext>({
  name: 'SelectItemContext',
  hookName: 'useSelectItemContext',
  providerName: '<SelectItemProvider />',
})
