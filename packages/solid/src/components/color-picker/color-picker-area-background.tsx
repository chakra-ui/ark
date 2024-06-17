import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaBackgroundBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerAreaBackgroundProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ColorPickerAreaBackgroundBaseProps {}

export const ColorPickerAreaBackground = (props: ColorPickerAreaBackgroundProps) => {
  const api = useColorPickerContext()
  const areaProps = useColorPickerAreaPropsContext()
  const mergedProps = mergeProps(() => api().getAreaBackgroundProps(areaProps), props)

  return <ark.div {...mergedProps} />
}
