import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export interface NumberInputControlProps extends HTMLArkProps<'div'> {}

export const NumberInputControl = forwardRef<HTMLDivElement, NumberInputControlProps>(
  (props, ref) => {
    const api = useNumberInputContext()
    const mergedProps = mergeProps(api.controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NumberInputControl.displayName = 'NumberInputControl'
