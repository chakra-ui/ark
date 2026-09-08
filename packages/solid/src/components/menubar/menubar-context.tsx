import type { JSX } from 'solid-js'
import { type UseMenubarContext, useMenubarContext } from './use-menubar-context.ts'

export interface MenubarContextProps {
  children: (context: UseMenubarContext) => JSX.Element
}

export const MenubarContext = (props: MenubarContextProps) => props.children(useMenubarContext())
