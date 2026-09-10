import type { InputProps, InputState } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerInputState extends InputState {}

export interface DatePickerInputBaseProps extends InputProps, PolymorphicProps<'input', DatePickerInputState> {}
export interface DatePickerInputProps extends HTMLProps<'input'>, DatePickerInputBaseProps {}

export const DatePickerInput = (props: DatePickerInputProps) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['index', 'fixOnBlur'])
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} state={datePicker().getInputState()} />
}
