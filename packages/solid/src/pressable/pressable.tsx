import type { Assign } from '@polymorphic-factory/solid'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { usePressable, UsePressableProps } from './use-pressable'

export type PressableProps = Assign<HTMLArkProps<'button'>, UsePressableProps>

export const Pressable = (props: PressableProps) => {
  const [usePressableProps, divProps] = createSplitProps<UsePressableProps>()(props, [
    'allowTextSelectionOnPress',
    'cancelOnPointerExit',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'onLongPress',
    'onPress',
    'onPressEnd',
    'onPressStart',
    'onPressUp',
    'preventFocusOnPress',
  ])
  const { pressableProps } = usePressable(usePressableProps)
  const mergedProps = mergeProps(pressableProps, divProps)

  return <ark.button {...mergedProps} />
}
