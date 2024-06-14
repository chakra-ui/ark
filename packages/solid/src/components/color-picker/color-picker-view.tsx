import { colorPickerAnatomy } from '@ark-ui/anatomy'
import type { ColorFormat } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerFormatPropsProvider } from './use-color-picker-format-context'

interface FormatOptions {
  format: ColorFormat
}

export interface ColorPickerViewProps extends HTMLArkProps<'div'>, FormatOptions {}

export const ColorPickerView = (props: ColorPickerViewProps) => {
  const api = useColorPickerContext()
  const [formatProps, localProps] = createSplitProps<FormatOptions>()(props, ['format'])
  const mergedProps = mergeProps(() => colorPickerAnatomy.build().view.attrs, localProps)

  return (
    <ColorPickerFormatPropsProvider value={formatProps}>
      <Show when={api().format === props.format}>
        <ark.div data-format={props.format} {...mergedProps} />
      </Show>
    </ColorPickerFormatPropsProvider>
  )
}
