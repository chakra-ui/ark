'use client'

import type { ReactNode } from 'react'
import { type UseWindowVirtualizerContext, useWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

export interface WindowVirtualizerContextProps {
  children: (context: UseWindowVirtualizerContext) => ReactNode
}

export const WindowVirtualizerContext = (props: WindowVirtualizerContextProps) =>
  props.children(useWindowVirtualizerContext())
