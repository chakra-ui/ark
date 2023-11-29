import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { runIfFn } from '../run-if-fn'
import { TooltipProvider } from './tooltip-context'
import { useTooltip, type UseTooltipProps, type UseTooltipReturn } from './use-tooltip'

export interface TooltipProps extends UseTooltipProps, UsePresenceProps {
  children?: ReactNode | ((api: UseTooltipReturn) => ReactNode)
}

export const Tooltip = (props: TooltipProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const api = useTooltip(localProps)
  const presenceApi = usePresence(mergeProps({ present: api.isOpen }, presenceProps))
  const view = runIfFn(children, api)

  return (
    <TooltipProvider value={api}>
      <PresenceProvider value={presenceApi}>{view}</PresenceProvider>
    </TooltipProvider>
  )
}
