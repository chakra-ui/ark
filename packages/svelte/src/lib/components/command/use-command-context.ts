import { createContext } from '$lib/utils/create-context'
import type { CollectionItem } from '../collection/index.ts'
import type { UseCommandReturn } from './use-command.svelte.ts'

export interface UseCommandContext<T extends CollectionItem> extends UseCommandReturn<T> {}

export const [CommandProvider, useCommandContext] = createContext<UseCommandContext<any>>({
  name: 'CommandContext',
  hookName: 'useCommandContext',
  providerName: '<CommandProvider />',
})
