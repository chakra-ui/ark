'use client'

import { createContext } from '../../utils/create-context.ts'
import type { CollectionItem } from '../collection/index.ts'
import type { UseCommandReturn } from './use-command.ts'

export interface UseCommandContext<T extends CollectionItem> extends UseCommandReturn<T> {}

export const [CommandProvider, useCommandContext] = createContext<UseCommandContext<any>>({
  name: 'CommandContext',
  hookName: 'useCommandContext',
  providerName: '<CommandProvider />',
})
