import type { InputProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerInputBaseProps extends InputProps, PolymorphicProps<'input'> {}
export interface DatePickerInputProps extends HTMLProps<'input'>, DatePickerInputBaseProps {}

export const DatePickerInput = (props: DatePickerInputProps) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['index'])
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} />
}
