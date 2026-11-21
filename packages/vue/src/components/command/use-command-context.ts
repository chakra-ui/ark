import { createContext } from '../../utils/create-context.ts'
import type { CollectionItem } from '../collection/index.ts'
import type { UseCommandReturn } from './use-command.ts'

export interface UseCommandContext<T extends CollectionItem = CollectionItem> extends UseCommandReturn<T> {}

export const [CommandProvider, useCommandContext] = createContext<UseCommandContext<any>>('CommandContext')
