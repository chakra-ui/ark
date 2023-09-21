import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxPositionerProps extends HTMLArkProps<'div'> {}

export const ComboboxPositioner = forwardRef<HTMLDivElement, ComboboxPositionerProps>(
  (props, ref) => {
    const api = useComboboxContext()
    const mergedProps = mergeProps(api.positionerProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

ComboboxPositioner.displayName = 'ComboboxPositioner'
