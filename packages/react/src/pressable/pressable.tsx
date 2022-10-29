import { usePressable, UsePressableProps } from './use-pressable'
import { forwardRef } from '../forwardRef'
import { atlas, HTMLAtlasProps } from '../factory'

export type PressableProps = UsePressableProps & HTMLAtlasProps<'button'>

export const Pressable = forwardRef<'button', PressableProps>((props, ref) => {
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

  return <atlas.button {...api.pressableProps} {...restProps} ref={ref} />
})
