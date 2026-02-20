import type { JSX } from 'solid-js'
import { type UseDrawerContext, useDrawerContext } from './use-drawer-context'

export interface DrawerContextProps {
  children: (context: UseDrawerContext) => JSX.Element
}

export const DrawerContext = (props: DrawerContextProps) => props.children(useDrawerContext())
