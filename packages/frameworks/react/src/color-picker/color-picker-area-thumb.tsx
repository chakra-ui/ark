import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './color-picker-area-context'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerAreaThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaThumb = forwardRef<HTMLDivElement, ColorPickerAreaThumbProps>(
  (props, ref) => {
    const colorAreaProps = useColorPickerAreaContext()
    const api = useColorPickerContext()
    const mergedProps = mergeProps(api.getAreaThumbProps(colorAreaProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerAreaThumb.displayName = 'ColorPickerAreaThumb'
