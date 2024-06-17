import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseTooltipReturn } from './use-tooltip'
import { TooltipProvider } from './use-tooltip-context'

interface RootProviderProps {
  value: UseTooltipReturn
}

export interface TooltipRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface TooltipRootProviderProps extends TooltipRootProviderBaseProps {
  children?: JSX.Element
}

export const TooltipRootProvider = (props: TooltipRootProviderProps) => {
  const [presenceProps, tooltipProps] = splitPresenceProps(props)
  const presence = usePresence(
    mergeProps(presenceProps, () => ({ present: tooltipProps.value().open })),
  )

  return (
    <TooltipProvider value={tooltipProps.value}>
      <PresenceProvider value={presence}>{tooltipProps.children}</PresenceProvider>
    </TooltipProvider>
  )
}
