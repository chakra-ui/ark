import { type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaGradientProps = HTMLArkProps<'div'>

export const ColorPickerAreaGradient = (props: ColorPickerAreaGradientProps) => {
  const areaContext = useColorPickerAreaContext()
  const colorPicker = useColorPickerContext()

  // return <ark.div {...areaContext.get}
  // const { getAreaGradientProps } = useColorPickerContext()
  // const mergedProps = mergeProps(getAreaGradientProps(areaContext), props)

  // return <ark.div {...mergedProps} ref={ref} />
}
