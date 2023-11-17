import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

interface TransparencyGridProps {
  size: string
}

export interface ColorPickerTransparencyGridProps
  extends Assign<HTMLArkProps<'div'>, TransparencyGridProps> {}

export const ColorPickerTransparencyGrid = (props: ColorPickerTransparencyGridProps) => {
  const [gridProps, localProps] = createSplitProps<TransparencyGridProps>()(props, ['size'])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getTransparencyGridProps(gridProps), localProps)

  return <ark.div {...mergedProps} />
}
