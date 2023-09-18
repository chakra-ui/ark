import type { ItemProps } from '@zag-js/select'
import { createContext } from '../create-context'

export type SelectItemContext = ItemProps

export const [SelectItemProvider, useSelectItemContext] = createContext<SelectItemContext>({
  name: 'SelectItemContext',
  hookName: 'useSelectItemContext',
  providerName: '<SelectItemProvider />',
})
