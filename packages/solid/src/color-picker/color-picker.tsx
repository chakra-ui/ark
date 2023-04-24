import { children, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import { ColorPickerProvider } from './color-picker-context'
import {
  useColorPicker,
  type UseColorPickerProps,
  type UseColorPickerReturn,
} from './use-color-picker'

export type ColorPickerProps = UseColorPickerProps & {
  children?: JSX.Element | ((state: ReturnType<UseColorPickerReturn>) => JSX.Element)
}

export const ColorPicker = (props: ColorPickerProps) => {
  const [useColorPickerProps, restProps] = createSplitProps<UseColorPickerProps>()(props, [
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'onChange',
    'onChangeEnd',
    'readOnly',
    'value',
  ])
  const colorPicker = useColorPicker(useColorPickerProps)
  const view = children(() => runIfFn(restProps.children, colorPicker()))

  return <ColorPickerProvider value={colorPicker}>{view()}</ColorPickerProvider>
}
