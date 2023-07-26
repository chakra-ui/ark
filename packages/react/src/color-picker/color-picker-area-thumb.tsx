import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaThumbProps = HTMLArkProps<'div'>

export const ColorPickerAreaThumb = forwardRef<'div'>((props, ref) => {
  const colorAreaProps = useColorPickerAreaContext()
  const { getAreaThumbProps } = useColorPickerContext()
  const mergedProps = mergeProps(getAreaThumbProps(colorAreaProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})
