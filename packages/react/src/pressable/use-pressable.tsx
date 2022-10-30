import * as pressable from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'
import { splitProps } from '../split-props'

export type UsePressableProps = Omit<pressable.Context, 'id'>
export type UsePressableReturn = ReturnType<typeof usePressable>

export const usePressable = (props: UsePressableProps) => {
  const [pressableProps, htmlProps] = splitProps(props, [
    'allowTextSelectionOnPress',
    'cancelOnPointerExit',
    'dir',
    'disabled',
    'getRootNode',
    'onLongPress',
    'onPress',
    'onPressEnd',
    'onPressStart',
    'onPressUp',
    'preventFocusOnPress',
  ])

  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...pressableProps,
  })

  const [state, send] = useMachine(pressable.machine(initialContext), { context: initialContext })

  const api = pressable.connect(state, send, normalizeProps)
  return { api, htmlProps }
}
