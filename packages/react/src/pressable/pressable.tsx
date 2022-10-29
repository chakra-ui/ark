import type { ComponentProps } from 'react'
import { usePressable, UsePressableProps } from './use-pressable'

export type PressableProps = UsePressableProps & ComponentProps<'button'>

export const Pressable = (props: PressableProps) => {
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
    ...restProps
  } = props

  const api = usePressable({
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
  })

  return <button {...api.pressableProps} {...restProps} />
}
