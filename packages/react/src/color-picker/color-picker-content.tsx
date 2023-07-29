import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerContentProps = ComponentPropsWithoutRef<typeof ark.div>

export const ColorPickerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  (props, ref) => {
    const { contentProps } = useColorPickerContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ColorPickerContent.displayName = 'ColorPickerContent'
