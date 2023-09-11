import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputControlProps = HTMLArkProps<'div'>

export const NumberInputControl = forwardRef<HTMLDivElement, NumberInputControlProps>(
  (props, ref) => {
    const { controlProps } = useNumberInputContext()
    const mergedProps = mergeProps(controlProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NumberInputControl.displayName = 'NumberInputControl'
