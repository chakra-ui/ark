import type { ReactNode } from 'react'
import { type UseDrawerContext, useDrawerContext } from './use-drawer-context'

export interface DrawerContextProps {
  children: (context: UseDrawerContext) => ReactNode
}

export const DrawerContext = (props: DrawerContextProps) => props.children(useDrawerContext())
