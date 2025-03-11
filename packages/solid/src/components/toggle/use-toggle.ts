import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as toggle from '@zag-js/toggle'
import { type Accessor, createMemo } from 'solid-js'

export interface UseToggleProps extends toggle.Props {}

export type UseToggleReturn = Accessor<toggle.Api<PropTypes>>

export function useToggle(props?: UseToggleProps): UseToggleReturn {
  const service = useMachine(toggle.machine, props)
  return createMemo(() => toggle.connect(service, normalizeProps))
}
