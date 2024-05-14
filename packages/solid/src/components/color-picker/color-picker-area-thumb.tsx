import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useColorPickerAreaPropsContext } from './use-color-picker-area-props-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaThumb = (props: ColorPickerAreaThumbProps) => {
  const api = useColorPickerContext()
  const areaProps = useColorPickerAreaPropsContext()
  const mergedProps = mergeProps(() => api().getAreaThumbProps(areaProps), props)

  return <ark.div {...mergedProps} />
}
