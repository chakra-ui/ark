import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'children'>> {}

export const ColorPickerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  (props, ref) => {
    const [presenceProps, localProps] = splitPresenceProps(props)
    const api = useColorPickerContext()

    return (
      <Presence present={api.isOpen} {...presenceProps}>
        <ColorPickerInnerContent ref={ref} {...localProps} />
      </Presence>
    )
  },
)

ColorPickerContent.displayName = 'ColorPickerContent'

const ColorPickerInnerContent = forwardRef<HTMLDivElement, ColorPickerContentProps>(
  function ColorPickerInnerContent(props, ref) {
    const api = useColorPickerContext()
    const mergedProps = mergeProps(api.contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
