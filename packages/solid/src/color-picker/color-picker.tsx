import { children, type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import type { HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { ColorPickerProvider } from './color-picker-context'
import {
  useColorPicker,
  type UseColorPickerProps,
  type UseColorPickerReturn,
} from './use-color-picker'

export type ColorPickerProps = Assign<
  HTMLArkProps<'div'>,
  UseColorPickerProps & {
    children?: JSX.Element | ((state: Accessor<ReturnType<UseColorPickerReturn>>) => JSX.Element)
  }
>

export const ColorPicker = (props: ColorPickerProps) => {
  const [useColorPickerProps, restProps] = createSplitProps<UseColorPickerProps>()(props, [
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'onChange',
    'onChangeEnd',
    'readOnly',
    'value',
  ])
  const colorPicker = useColorPicker(useColorPickerProps)
  const getChildren = children(() => runIfFn(restProps.children, colorPicker))

  return <ColorPickerProvider value={colorPicker}>{getChildren()}</ColorPickerProvider>
}
