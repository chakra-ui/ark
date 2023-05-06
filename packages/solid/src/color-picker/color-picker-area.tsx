import type { ColorAreaProps } from '@zag-js/color-picker'
import { mergeProps } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaProps = HTMLArkProps<'div'> & ColorAreaProps

export const ColorPickerArea = (props: ColorPickerAreaProps) => {
  const [areaProps, divprops] = createSplitProps<ColorAreaProps>()(props, ['xChannel', 'yChannel'])
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker().getAreaProps(areaProps), divprops)

  console.log({ areaProps })
  return (
    <ColorPickerAreaProvider value={areaProps}>
      <ark.div {...mergedProps} />
    </ColorPickerAreaProvider>
  )
}
