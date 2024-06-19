import type { AreaProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { ColorPickerAreaPropsProvider } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaBaseProps extends AreaProps, PolymorphicProps {}
export interface ColorPickerAreaProps extends HTMLProps<'div'>, ColorPickerAreaBaseProps {}

export const ColorPickerArea = forwardRef<HTMLDivElement, ColorPickerAreaProps>((props, ref) => {
  const [areaProps, localProps] = createSplitProps<AreaProps>()(props, ['xChannel', 'yChannel'])
  const colorPicker = useColorPickerContext()
  const mergedProps = mergeProps(colorPicker.getAreaProps(areaProps), localProps)

  return (
    <ColorPickerAreaPropsProvider value={areaProps}>
      <ark.div {...mergedProps} ref={ref} />
    </ColorPickerAreaPropsProvider>
  )
})

ColorPickerArea.displayName = 'ColorPickerArea'
