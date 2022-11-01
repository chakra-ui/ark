import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { usePressable, UsePressableProps } from './use-pressable'

export type PressableProps = Assign<HTMLAtlasProps<'button'>, UsePressableProps>

export const Pressable = forwardRef<'button', PressableProps>((props, ref) => {
  const [usePressableProps, rootProps] = splitProps(props, [
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
  const { pressableProps } = usePressable(usePressableProps)
  return <atlas.button {...pressableProps} {...rootProps} ref={ref} />
})
