import { type ReactNode } from 'react'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { TooltipProvider, type TooltipContext } from './tooltip-context'
import { useTooltip, type UseTooltipProps } from './use-tooltip'

export interface TooltipProps
  extends Assign<
      UseTooltipProps,
      { children?: ReactNode | ((props: TooltipContext) => ReactNode) }
    >,
    UsePresenceProps {}

export const Tooltip = (props: TooltipProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const api = useTooltip(localProps)
  const presenceApi = usePresence({ ...presenceProps, present: api.isOpen })
  const view = runIfFn(children, api)

  return (
    <TooltipProvider value={api}>
      <PresenceProvider value={presenceApi}>{view}</PresenceProvider>
    </TooltipProvider>
  )
}
