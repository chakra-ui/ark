import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerAreaBackgroundProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaBackground: ArkComponent<'div'> = (
  props: ColorPickerAreaBackgroundProps,
) => {
  const colorAreaProps = useColorPickerAreaContext()
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getAreaBackgroundProps(colorAreaProps), props)

  return <ark.div {...mergedProps} />
}
