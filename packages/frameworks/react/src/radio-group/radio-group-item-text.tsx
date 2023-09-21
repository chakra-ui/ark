import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioGroupItemContext } from './radio-group-item-context'

export interface RadioGroupItemTextProps extends HTMLArkProps<'span'> {}

export const RadioGroupItemText = forwardRef<HTMLSpanElement, RadioGroupItemTextProps>(
  (props, ref) => {
    const api = useRadioGroupContext()
    const itemProps = useRadioGroupItemContext()
    const mergedProps = mergeProps(api.getItemTextProps(itemProps), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

RadioGroupItemText.displayName = 'RadioGroupItemText'
