import type { TransparencyGridProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerTransparencyGridBaseProps
  extends TransparencyGridProps,
    PolymorphicProps<'div'> {}
export interface ColorPickerTransparencyGridProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ColorPickerTransparencyGridBaseProps {}

export const ColorPickerTransparencyGrid = (props: ColorPickerTransparencyGridProps) => {
  const [gridProps, localProps] = createSplitProps<TransparencyGridProps>()(props, ['size'])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getTransparencyGridProps(gridProps), localProps)

  return <ark.div {...mergedProps} />
}
