import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemContext } from './use-radio-group-item-context'

export interface RadioGroupItemControlProps extends HTMLArkProps<'div'> {}

export const RadioGroupItemControl = forwardRef<HTMLDivElement, RadioGroupItemControlProps>(
  (props, ref) => {
    const context = useRadioGroupContext()
    const itemContext = useRadioGroupItemContext()
    const mergedProps = mergeProps(context.getItemControlProps(itemContext), props)

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...context.getItemHiddenInputProps(itemContext)} />
      </>
    )
  },
)

RadioGroupItemControl.displayName = 'RadioGroupItemControl'
