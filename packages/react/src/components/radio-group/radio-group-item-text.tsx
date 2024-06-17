import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemTextBaseProps extends PolymorphicProps {}
export interface RadioGroupItemTextProps
  extends HTMLAttributes<HTMLSpanElement>,
    RadioGroupItemTextBaseProps {}

export const RadioGroupItemText = forwardRef<HTMLSpanElement, RadioGroupItemTextProps>(
  (props, ref) => {
    const radioGroup = useRadioGroupContext()
    const itemProps = useRadioGroupItemPropsContext()
    const mergedProps = mergeProps(radioGroup.getItemTextProps(itemProps), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

RadioGroupItemText.displayName = 'RadioGroupItemText'
