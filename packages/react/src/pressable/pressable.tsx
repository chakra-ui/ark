import type { ComponentProps } from 'react'
import { usePressable, UsePressableProps } from './use-pressable'

export type PressableProps = UsePressableProps & ComponentProps<'button'>

export const Pressable = (props: PressableProps) => {
  const {
    onPress,
    allowTextSelectionOnPress,
    dir,
    cancelOnPointerExit,
    onLongPress,
    onPressEnd,
    onPressStart,
    onPressUp,
    disabled,
    getRootNode,
    preventFocusOnPress,
    ...restProps
  } = props

  const api = usePressable({
    onPress,
    allowTextSelectionOnPress,
    dir,
    cancelOnPointerExit,
    onLongPress,
    onPressEnd,
    onPressStart,
    onPressUp,
    disabled,
    getRootNode,
    preventFocusOnPress,
  })

  return <button {...api.pressableProps} {...restProps} />
}
