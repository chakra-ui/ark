import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputHiddenInputBaseProps extends PolymorphicProps {
  index?: number
}
export interface DateInputHiddenInputProps extends HTMLProps<'input'>, DateInputHiddenInputBaseProps {}

export const DateInputHiddenInput = forwardRef<HTMLInputElement, DateInputHiddenInputProps>((props, ref) => {
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(dateInput.getHiddenInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
})

DateInputHiddenInput.displayName = 'DateInputHiddenInput'
