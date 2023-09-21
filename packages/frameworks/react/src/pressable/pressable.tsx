import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { usePressable, type UsePressableProps } from './use-pressable'

export interface PressableProps extends Assign<HTMLArkProps<'button'>, UsePressableProps> {}

export const Pressable = forwardRef<HTMLButtonElement, PressableProps>((props, ref) => {
  const [usePressableProps, divProps] = createSplitProps<UsePressableProps>()(props, [
    'allowTextSelectionOnPress',
    'cancelOnPointerExit',
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'longPressDelay',
    'onLongPress',
    'onPress',
    'onPressEnd',
    'onPressStart',
    'onPressUp',
    'preventFocusOnPress',
  ])

  const api = usePressable(usePressableProps)
  const mergedProps = mergeProps(api.pressableProps, divProps)

  return <ark.button {...mergedProps} ref={ref} />
})

Pressable.displayName = 'Pressable'
