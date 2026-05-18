'use client'

import type { ReactNode } from 'react'
import { type UseCollapsibleContext, useCollapsibleContext } from './use-collapsible-context.ts'

export interface CollapsibleContextProps {
  children: (context: UseCollapsibleContext) => ReactNode
}

export const CollapsibleContext = (props: CollapsibleContextProps) => props.children(useCollapsibleContext())
