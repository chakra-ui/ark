import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerViewContext } from './use-date-picker-view-props-context.ts'

export interface DatePickerNextTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DatePickerNextTriggerProps extends HTMLProps<'button'>, DatePickerNextTriggerBaseProps {}

export const DatePickerNextTrigger = (props: DatePickerNextTriggerProps) => {
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const mergedProps = mergeProps(() => api().getNextTriggerProps(viewProps), props)

  return <ark.button {...mergedProps} />
}
