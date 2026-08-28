'use client'

import type { ReactNode } from 'react'
import { type UseNavigationMenuContext, useNavigationMenuContext } from './use-navigation-menu-context.ts'

export interface NavigationMenuContextProps {
  children: (context: UseNavigationMenuContext) => ReactNode
}

export const NavigationMenuContext = (props: NavigationMenuContextProps) => props.children(useNavigationMenuContext())
