'use client'

import type { ItemState } from '@zag-js/combobox'
import { createContext } from '../../utils/create-context.ts'

export interface UseCommandItemContext extends ItemState {}

export const [CommandItemProvider, useCommandItemContext] = createContext<UseCommandItemContext>({
  name: 'CommandItemContext',
  hookName: 'useCommandItemContext',
  providerName: '<CommandItemProvider />',
})
