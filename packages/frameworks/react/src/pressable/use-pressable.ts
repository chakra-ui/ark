import * as pressable from '@zag-js/pressable'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UsePressableProps extends Optional<pressable.Context, 'id'> {}

export interface UsePressableReturn extends pressable.Api<PropTypes> {}

export const usePressable = (props: UsePressableProps = {}): UsePressableReturn => {
  const initialContext: pressable.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
  }

  const context: pressable.Context = {
    ...initialContext,
    onLongPress: useEvent(props.onLongPress),
    onPress: useEvent(props.onPress),
    onPressEnd: useEvent(props.onPressEnd),
    onPressStart: useEvent(props.onPressStart),
    onPressUp: useEvent(props.onPressUp),
  }

  const [state, send] = useMachine(pressable.machine(initialContext), { context })

  return pressable.connect(state, send, normalizeProps)
}
