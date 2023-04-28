import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaThumbProps = HTMLArkProps<'div'>

export const ColorPickerAreaThumb = forwardRef<'div', ColorPickerAreaThumbProps>((props, ref) => {
  const areaContext = useColorPickerAreaContext()
  const { getAreaThumbProps } = useColorPickerContext()
  const mergedProps = mergeProps(getAreaThumbProps(areaContext), props)

  return <ark.div {...mergedProps} ref={ref} />
})
