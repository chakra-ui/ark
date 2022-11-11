import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePressable, UsePressableProps } from './use-pressable'

export type PressableProps = Assign<HTMLArkProps<'button'>, UsePressableProps>

export const Pressable = forwardRef<'button', PressableProps>((props, ref) => {
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

  return <ark.button {...mergedProps} ref={ref} />
})
