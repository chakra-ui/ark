import type { JSX } from '@solidjs/web'
import type { CollectionItem } from '../collection/index.tsx'
import { type UseCommandContext, useCommandContext } from './use-command-context.ts'

export interface CommandContextProps<T extends CollectionItem> {
  children: (context: UseCommandContext<T>) => JSX.Element
}

export const CommandContext = <T extends CollectionItem = any>(props: CommandContextProps<T>) =>
  props.children(useCommandContext())
