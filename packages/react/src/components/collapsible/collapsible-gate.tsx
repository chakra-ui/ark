'use client'

import { Activity, type ReactNode } from 'react'
import type { UseCollapsibleReturn } from './use-collapsible.ts'

export interface CollapsibleGateProps {
  collapsible: Pick<UseCollapsibleReturn, 'isUnmounted' | 'visible' | 'hideMode'>
  children?: ReactNode | undefined
}

export const CollapsibleGate = (props: CollapsibleGateProps) => {
  const { collapsible, children } = props

  if (collapsible.isUnmounted) {
    return null
  }

  if (collapsible.hideMode === 'activity') {
    return <Activity mode={collapsible.visible ? 'visible' : 'hidden'}>{children}</Activity>
  }

  return children
}
