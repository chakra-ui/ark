import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { ColorPickerProvider } from './color-picker-context'
import {
  useColorPicker,
  type UseColorPickerProps,
  type UseColorPickerReturn,
} from './use-color-picker'

export type ColorPickerProps = Assign<
  HTMLArkProps<'div'>,
  UseColorPickerProps & {
    children?: JSX.Element | ((state: UseColorPickerReturn) => JSX.Element)
  }
>

export const ColorPicker = (props: ColorPickerProps) => {
  const [colorPickerProps, localProps] = createSplitProps<UseColorPickerProps>()(props, [
    'alphaFormat',
    'autoFocus',
    'dir',
    'disabled',
    'format',
    'getRootNode',
    'id',
    'ids',
    'initialFocusEl',
    'name',
    'name',
    'onFocusOutside',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onValueChange',
    'onValueChangeEnd',
    'open',
    'positioning',
    'readOnly',
    'value',
  ])
  const api = useColorPicker(colorPickerProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <ColorPickerProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
      <input {...api().hiddenInputProps} />
    </ColorPickerProvider>
  )
}
