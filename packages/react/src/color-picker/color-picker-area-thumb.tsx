import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerAreaThumbProps = HtmlArkProps<'div'>

export const ColorPickerAreaThumb = forwardRef<HTMLDivElement, ColorPickerAreaThumbProps>(
  (props, ref) => {
    const colorAreaProps = useColorPickerAreaContext()
    const { getAreaThumbProps } = useColorPickerContext()
    const mergedProps = mergeProps(getAreaThumbProps(colorAreaProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerAreaThumb.displayName = 'ColorPickerAreaThumb'
