'use client'

import type { ReactNode } from 'react'
import { type UseGridVirtualizerContext, useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'

export interface GridVirtualizerContextProps {
  children: (context: UseGridVirtualizerContext) => ReactNode
}

export const GridVirtualizerContext = (props: GridVirtualizerContextProps) =>
  props.children(useGridVirtualizerContext())
