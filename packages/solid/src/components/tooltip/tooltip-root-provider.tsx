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
  children?: JSX.Element
  value: UseTooltipReturn
}

export interface TooltipRootProviderProps extends RootProviderProps, UsePresenceProps {}

export const TooltipRootProvider = (props: TooltipRootProviderProps) => {
  const [presenceProps, { value: tooltip, children }] = splitPresenceProps(props)
  const presence = usePresence(mergeProps(presenceProps, () => ({ present: tooltip().open })))

  return (
    <TooltipProvider value={tooltip}>
      <PresenceProvider value={presence}>{children}</PresenceProvider>
    </TooltipProvider>
  )
}
