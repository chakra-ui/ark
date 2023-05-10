import type { Assign } from '@polymorphic-factory/solid'
import { children, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import type { HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { ColorPickerProvider, useColorPickerContext } from './color-picker-context'
import {
  useColorPicker,
  type UseColorPickerProps,
  type UseColorPickerReturn,
} from './use-color-picker'

export type ColorPickerProps = Assign<ColorPickerContextWrapperProps, UseColorPickerProps>

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

  return (
    <ColorPickerProvider value={colorPicker}>
      <ColorPickerContextWrapper {...restProps} />
    </ColorPickerProvider>
  )
}

type ColorPickerContextWrapperProps = Assign<
  HTMLArkProps<'div'>,
  {
    children?: JSX.Element | ((state: ReturnType<UseColorPickerReturn>) => JSX.Element)
  }
>

const ColorPickerContextWrapper = (props: ColorPickerContextWrapperProps) => {
  const colorPicker = useColorPickerContext()
  const view = children(() => runIfFn(props.children, colorPicker()))

  return <>{view()}</>
}
