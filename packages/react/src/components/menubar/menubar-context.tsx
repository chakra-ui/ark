'use client'

import type { ReactNode } from 'react'
import { type UseMenubarContext, useMenubarContext } from './use-menubar-context.ts'

export interface MenubarContextProps {
  children: (context: UseMenubarContext) => ReactNode
}

export const MenubarContext = (props: MenubarContextProps) => props.children(useMenubarContext())
