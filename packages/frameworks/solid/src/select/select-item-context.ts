import type { ItemProps } from '@zag-js/select'
import { createContext } from '../create-context'

export interface SelectItemContext extends ItemProps {}

export const [SelectItemProvider, useSelectItemContext] = createContext<SelectItemContext>({
  hookName: 'useSelectItemContext',
  providerName: '<SelectItemProvider />',
})
