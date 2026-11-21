import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemProps } from '@zag-js/combobox'

export interface UseCommandItemPropsContext extends Accessor<ItemProps> {}

export const [CommandItemPropsProvider, useCommandItemPropsContext] = createContext<UseCommandItemPropsContext>({
  name: 'CommandItemPropsContext',
  hookName: 'useCommandItemPropsContext',
  providerName: '<CommandItemPropsProvider />',
})
