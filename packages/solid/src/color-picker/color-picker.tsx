import { type JSX } from 'solid-js'
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
    children?: JSX.Element | ((state: UseColorPickerReturn) => JSX.Element)
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
  const api = useColorPicker(useColorPickerProps)
  const getChildren = () => runIfFn(restProps.children, api)

  return <ColorPickerProvider value={api}>{getChildren()}</ColorPickerProvider>
}
