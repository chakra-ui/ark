import { normalizeProps, useMachine } from '@zag-js/react'
import * as pressable from '@zag-js/pressable'
import { useId } from 'react'

export type UsePressableProps = Omit<pressable.Context, 'id'>

export function usePressable(props: UsePressableProps) {
  const [state, send] = useMachine(
    pressable.machine({
      id: useId(),
      ...props,
    }),
  )

  return pressable.connect(state, send, normalizeProps)
}
