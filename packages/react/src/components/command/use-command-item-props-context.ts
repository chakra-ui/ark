'use client'

import type { ItemProps } from '@zag-js/combobox'
import { createContext } from '../../utils/create-context.ts'

export interface UseCommandItemPropsContext extends ItemProps {}

export const [CommandItemPropsProvider, useCommandItemPropsContext] = createContext<ItemProps>({
  name: 'CommandItemPropsContext',
  hookName: 'useCommandItemPropsContext',
  providerName: '<CommandItemPropsProvider />',
})
