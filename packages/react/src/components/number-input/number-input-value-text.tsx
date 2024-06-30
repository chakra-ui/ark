import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNumberInputContext } from './use-number-input-context'

export interface NumberInputValueTextBaseProps extends PolymorphicProps {}
export interface NumberInputValueTextProps
  extends HTMLProps<'span'>,
    NumberInputValueTextBaseProps {}

export const NumberInputValueText = forwardRef<HTMLSpanElement, NumberInputValueTextProps>(
  (props, ref) => {
    const { children, ...localProps } = props
    const numberInput = useNumberInputContext()
    const mergedProps = mergeProps(numberInput.getValueTextProps(), localProps)

    return (
      <ark.span {...mergedProps} ref={ref}>
        {children || numberInput.value}
      </ark.span>
    )
  },
)

NumberInputValueText.displayName = 'NumberInputValueText'
