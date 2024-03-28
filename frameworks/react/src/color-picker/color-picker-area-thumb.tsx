import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerAreaContext } from './use-color-picker-area-context'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerAreaThumbProps extends HTMLArkProps<'div'> {}

export const ColorPickerAreaThumb = forwardRef<HTMLDivElement, ColorPickerAreaThumbProps>(
  (props, ref) => {
    const context = useColorPickerContext()
    const areaContext = useColorPickerAreaContext()
    const mergedProps = mergeProps(context.getAreaThumbProps(areaContext), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerAreaThumb.displayName = 'ColorPickerAreaThumb'
