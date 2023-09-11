import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxPositionerProps = HTMLArkProps<'div'>

export const ComboboxPositioner = forwardRef<HTMLDivElement, ComboboxPositionerProps>(
  (props, ref) => {
    const { positionerProps } = useComboboxContext()
    const mergedProps = mergeProps(positionerProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxPositioner.displayName = 'ComboboxPositioner'
