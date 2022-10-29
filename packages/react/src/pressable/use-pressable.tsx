import * as pressable from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UsePressableProps = Omit<pressable.Context, 'id'>
export type UsePressableReturn = ReturnType<typeof usePressable>

export const usePressable = (props: UsePressableProps) => {
  const {
    allowTextSelectionOnPress,
    cancelOnPointerExit,
    dir,
    disabled,
    getRootNode,
    onLongPress,
    onPress,
    onPressEnd,
    onPressStart,
    onPressUp,
    preventFocusOnPress,
    ...htmlProps
  } = props

  const [state, send] = useMachine(
    pressable.machine({
      id: useId(),
      allowTextSelectionOnPress,
      cancelOnPointerExit,
      dir,
      disabled,
      getRootNode,
      onLongPress,
      onPress,
      onPressEnd,
      onPressStart,
      onPressUp,
      preventFocusOnPress,
    }),
  )

  const api = pressable.connect(state, send, normalizeProps)
  return { api, htmlProps }
}
