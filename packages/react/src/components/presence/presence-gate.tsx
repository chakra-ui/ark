'use client'

import { Activity, type ReactNode } from 'react'
import type { UsePresenceReturn } from './use-presence.ts'

export interface PresenceGateProps {
  presence: Pick<UsePresenceReturn, 'unmounted' | 'present' | 'hideMode'>
  children?: ReactNode | undefined
}

export const PresenceGate = (props: PresenceGateProps) => {
  const { presence, children } = props

  if (presence.unmounted) {
    return null
  }

  if (presence.hideMode === 'activity') {
    return <Activity mode={presence.present ? 'visible' : 'hidden'}>{children}</Activity>
  }

  return children
}
