'use client'

import type { ReactNode } from 'react'
import type { CollectionItem } from '../collection/index.ts'
import { type UseCommandContext, useCommandContext } from './use-command-context.ts'

export interface CommandContextProps<T extends CollectionItem> {
  children: (context: UseCommandContext<T>) => ReactNode
}

export const CommandContext = <T extends CollectionItem = any>(props: CommandContextProps<T>) =>
  props.children(useCommandContext())
