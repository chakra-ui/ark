import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemControlBaseProps extends PolymorphicProps {}
export interface RadioGroupItemControlProps
  extends HTMLAttributes<HTMLDivElement>,
    RadioGroupItemControlBaseProps {}

export const RadioGroupItemControl = forwardRef<HTMLDivElement, RadioGroupItemControlProps>(
  (props, ref) => {
    const radioGroup = useRadioGroupContext()
    const itemProps = useRadioGroupItemPropsContext()
    const mergedProps = mergeProps(radioGroup.getItemControlProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

RadioGroupItemControl.displayName = 'RadioGroupItemControl'
