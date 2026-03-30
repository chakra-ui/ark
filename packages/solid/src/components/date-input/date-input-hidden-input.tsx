import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputHiddenInputBaseProps extends PolymorphicProps<'input'> {
  index?: number
}
export interface DateInputHiddenInputProps extends HTMLProps<'input'>, DateInputHiddenInputBaseProps {}

export const DateInputHiddenInput = ({ index: _index, ...props }: DateInputHiddenInputProps) => {
  const api = useDateInputContext()
  const mergedProps = mergeProps(() => api().getHiddenInputProps(), props)
  const field = useFieldContext()
  return <ark.input aria-describedby={field?.().ariaDescribedby} {...mergedProps} />
}
