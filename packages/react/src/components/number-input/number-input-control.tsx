import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputControlBaseProps extends PolymorphicProps {}
export interface NumberInputControlProps extends HTMLProps<'div'>, NumberInputControlBaseProps {}

export const NumberInputControl = forwardRef<HTMLDivElement, NumberInputControlProps>(
  (props, ref) => {
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getControlProps(), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

NumberInputControl.displayName = 'NumberInputControl'
