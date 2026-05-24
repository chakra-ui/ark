import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerAreaThumbBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerAreaThumbProps extends HTMLProps<'div'>, ColorPickerAreaThumbBaseProps {}

export const ColorPickerAreaThumb = (props: ColorPickerAreaThumbProps) => {
  const api = useColorPickerContext()
  const areaProps = useColorPickerAreaPropsContext()
  const mergedProps = mergeProps(() => api().getAreaThumbProps(areaProps), props)

  return <ark.div {...mergedProps} />
}
