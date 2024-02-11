import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

// TODO: remove after zag is updated
interface InputProps {
  index?: number
}

export interface DatePickerInputProps extends Assign<HTMLArkProps<'input'>, InputProps> {}

export const DatePickerInput: ArkComponent<'input'> = (props: DatePickerInputProps) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['index'])
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} />
}
