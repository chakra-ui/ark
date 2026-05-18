'use client'

import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import type { UsePresenceProps } from '../presence/index.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { splitPresenceProps } from '../presence/split-presence-props.ts'
import type { UseTooltipReturn } from './use-tooltip.ts'
import { TooltipProvider } from './use-tooltip-context.ts'

interface RootProviderProps {
  value: UseTooltipReturn
}

export interface TooltipRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface TooltipRootProviderProps extends TooltipRootProviderBaseProps {
  children?: ReactNode | undefined
}

export const TooltipRootProvider = (props: TooltipRootProviderProps) => {
  const [presenceProps, { value: tooltip, children }] = splitPresenceProps(props)
  const presence = usePresence(mergeProps({ present: tooltip.open }, presenceProps))

  return (
    <TooltipProvider value={tooltip}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </TooltipProvider>
  )
}
