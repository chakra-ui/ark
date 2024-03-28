import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-context'

export interface RadioGroupItemControlProps extends HTMLArkProps<'div'> {}

export const RadioGroupItemControl = forwardRef<HTMLDivElement, RadioGroupItemControlProps>(
  (props, ref) => {
    const context = useRadioGroupContext()
    const itemProps = useRadioGroupItemPropsContext()
    const mergedProps = mergeProps(context.getItemControlProps(itemProps), props)

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...context.getItemHiddenInputProps(itemProps)} />
      </>
    )
  },
)

RadioGroupItemControl.displayName = 'RadioGroupItemControl'
