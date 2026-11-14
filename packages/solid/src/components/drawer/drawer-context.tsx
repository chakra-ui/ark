import type { JSX } from '@solidjs/web'
import { type UseDrawerContext, useDrawerContext } from './use-drawer-context.ts'

export interface DrawerContextProps {
  children: (context: UseDrawerContext) => JSX.Element
}

export const DrawerContext = (props: DrawerContextProps) => props.children(useDrawerContext())
