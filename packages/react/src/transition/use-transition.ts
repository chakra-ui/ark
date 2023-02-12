import { normalizeProps, useMachine } from '@zag-js/react'
import * as transition from '@zag-js/transition'

export type UseTransitionProps = transition.Context & {
  enter: React.CSSProperties
  exit: React.CSSProperties
}

export const useTransition = (props: UseTransitionProps) => {
  const { enter, exit, ...machineContext } = props
  const [state, send] = useMachine(transition.machine(machineContext), { context: machineContext })
  const api = transition.connect(state, send, normalizeProps)
  const style = api.transition({
    variants: { enter, exit },
  })
  return { hidden: api.unmount, style }
}
