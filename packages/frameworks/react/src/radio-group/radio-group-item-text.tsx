import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemContext } from './use-radio-group-item-context'

export interface RadioGroupItemTextProps extends HTMLArkProps<'span'> {}

export const RadioGroupItemText = forwardRef<HTMLSpanElement, RadioGroupItemTextProps>(
  (props, ref) => {
    const context = useRadioGroupContext()
    const itemContext = useRadioGroupItemContext()
    const mergedProps = mergeProps(context.getItemTextProps(itemContext), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

RadioGroupItemText.displayName = 'RadioGroupItemText'
