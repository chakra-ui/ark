'use client'

import type { ReactNode } from 'react'
import { type UseListboxItemContext, useListboxItemContext } from './use-listbox-item-context.ts'

export interface ListboxItemContextProps {
  children: (context: UseListboxItemContext) => ReactNode
}

export const ListboxItemContext = (props: ListboxItemContextProps) => props.children(useListboxItemContext())
