import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as toggle from '@zag-js/toggle'

export interface UseToggleProps extends toggle.Props {}

export interface UseToggleReturn extends toggle.Api<PropTypes> {}

export function useToggle(props?: UseToggleProps): UseToggleReturn {
  const service = useMachine(toggle.machine, props)
  return toggle.connect(service, normalizeProps)
}
