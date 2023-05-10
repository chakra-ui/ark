import type { ColorAreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { ColorPickerAreaProvider } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaProps = HTMLArkProps<'div'> & ColorAreaProps

export const ColorPickerArea = (props: ColorPickerAreaProps) => {
  const [areaProps, localProps] = createSplitProps<ColorAreaProps>()(props, [
    'xChannel',
    'yChannel',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(api().getAreaProps(areaProps), localProps)

  return (
    <ColorPickerAreaProvider value={areaProps}>
      <ark.div {...mergedProps} />
    </ColorPickerAreaProvider>
  )
}
