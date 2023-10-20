import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioGroupItemContext } from './radio-group-item-context'

export interface RadioGroupItemControlProps extends HTMLArkProps<'div'> {}

export const RadioGroupItemControl = forwardRef<HTMLDivElement, RadioGroupItemControlProps>(
  (props, ref) => {
    const api = useRadioGroupContext()
    const itemProps = useRadioGroupItemContext()
    const mergedProps = mergeProps(api.getItemControlProps(itemProps), props)

    return (
      <>
        <ark.div {...mergedProps} ref={ref} />
        <input {...api.getItemHiddenInputProps(itemProps)} />
      </>
    )
  },
)

RadioGroupItemControl.displayName = 'RadioGroupItemControl'
