'use client'

import type { ReactNode } from 'react'
import { type UseListVirtualizerContext, useListVirtualizerContext } from './use-list-virtualizer-context.ts'

export interface ListVirtualizerContextProps {
  children: (context: UseListVirtualizerContext) => ReactNode
}

export const ListVirtualizerContext = (props: ListVirtualizerContextProps) =>
  props.children(useListVirtualizerContext())
