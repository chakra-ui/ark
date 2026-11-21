'use client'

import type { ReactNode } from 'react'
import { type UseCommandItemContext, useCommandItemContext } from './use-command-item-context.ts'

export interface CommandItemContextProps {
  children: (context: UseCommandItemContext) => ReactNode
}

export const CommandItemContext = (props: CommandItemContextProps) => props.children(useCommandItemContext())
