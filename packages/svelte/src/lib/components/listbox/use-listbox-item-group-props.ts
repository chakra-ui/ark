import type { Accessor } from '$lib/types.js'
import type { ItemGroupProps } from '@zag-js/listbox'
import { createContext } from '../../utils/create-context.js'

export interface UseListboxItemGroupPropsContext extends Accessor<ItemGroupProps> {}

export const [ListboxItemGroupPropsProvider, useListboxItemGroupPropsContext] =
  createContext<UseListboxItemGroupPropsContext>({
    name: 'ListboxItemGroupPropsContext',
    hookName: 'useListboxItemGroupPropsContext',
    providerName: '<ListboxItemGroupPropsProvider />',
  })
