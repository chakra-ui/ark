import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { useTooltip, type UseTooltipProps } from './use-tooltip'
import { TooltipProvider } from './use-tooltip-context'

export interface TooltipRootProps extends UseTooltipProps, UsePresenceProps {
  children?: ReactNode
}

export const TooltipRoot = (props: TooltipRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const context = useTooltip(localProps)
  const presenceApi = usePresence(mergeProps({ present: context.isOpen }, presenceProps))

  return (
    <TooltipProvider value={context}>
      <PresenceProvider value={presenceApi}>{children}</PresenceProvider>
    </TooltipProvider>
  )
}
