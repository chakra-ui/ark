import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemGroupProps } from '@zag-js/combobox'

export interface UseCommandItemGroupPropsContext extends Accessor<ItemGroupProps> {}

export const [CommandItemGroupPropsProvider, useCommandItemGroupPropsContext] =
  createContext<UseCommandItemGroupPropsContext>({
    name: 'CommandItemGroupPropsContext',
    hookName: 'useCommandItemGroupPropsContext',
    providerName: '<CommandItemGroupPropsProvider />',
  })
