import type { ColorAreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaProps = HTMLArkProps<'div'> & ColorAreaProps

export const ColorPickerArea = (props: ColorPickerAreaProps) => {
  const [colorAreaProps, restProps] = createSplitProps<ColorAreaProps>()(props, [
    'xChannel',
    'yChannel',
  ])

  const colorPicker = useColorPickerContext()
  const areaProps = mergeProps(() => colorPicker().getAreaProps(colorAreaProps), restProps)

  return (
    <ColorPickerAreaProvider value={colorAreaProps}>
      <ark.div {...areaProps} />
    </ColorPickerAreaProvider>
  )
}
