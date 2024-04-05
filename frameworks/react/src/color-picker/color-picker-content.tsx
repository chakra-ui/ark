import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContentProps extends HTMLArkProps<'div'> {}

export const ColorPickerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  (props, ref) => {
    const colorPicker = useColorPickerContext()
    const presenceApi = usePresenceContext()
    const mergedProps = mergeProps(
      colorPicker.contentProps,
      presenceApi.getPresenceProps(ref),
      props,
    )

    if (presenceApi.isUnmounted) {
      return null
    }

    return <ark.div {...mergedProps} />
  },
)

ColorPickerContent.displayName = 'ColorPickerContent'
