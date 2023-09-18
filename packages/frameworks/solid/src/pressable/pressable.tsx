import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePressable, type UsePressableProps } from './use-pressable'

export type PressableProps = Assign<HTMLArkProps<'button'>, UsePressableProps>

export const Pressable = (props: PressableProps) => {
  const [pressableParams, restProps] = createSplitProps<UsePressableProps>()(props, [
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

  const api = usePressable(pressableParams)
  const buttonProps = mergeProps(() => api().pressableProps, restProps)

  return <ark.button {...buttonProps} />
}
