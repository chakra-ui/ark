import type { TransparencyGridProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerTransparencyGridProps
  extends Assign<HTMLArkProps<'div'>, TransparencyGridProps> {}

export const ColorPickerTransparencyGrid = (props: ColorPickerTransparencyGridProps) => {
  const [gridProps, localProps] = createSplitProps<TransparencyGridProps>()(props, ['size'])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getTransparencyGridProps(gridProps), localProps)

  return <ark.div {...mergedProps} />
}
