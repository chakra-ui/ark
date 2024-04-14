import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemControlProps extends HTMLArkProps<'div'> {}

export const RadioGroupItemControl = forwardRef<HTMLDivElement, RadioGroupItemControlProps>(
  (props, ref) => {
    const radioGroup = useRadioGroupContext()
    const itemProps = useRadioGroupItemPropsContext()
    const mergedProps = mergeProps(radioGroup.getItemControlProps(itemProps), props)

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...radioGroup.getItemHiddenInputProps(itemProps)} />
      </>
    )
  },
)

RadioGroupItemControl.displayName = 'RadioGroupItemControl'
