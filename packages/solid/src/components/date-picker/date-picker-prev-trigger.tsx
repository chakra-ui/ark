import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerViewContext } from './use-date-picker-view-props-context.ts'

export interface DatePickerPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DatePickerPrevTriggerProps extends HTMLProps<'button'>, DatePickerPrevTriggerBaseProps {}

export const DatePickerPrevTrigger = (props: DatePickerPrevTriggerProps) => {
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const mergedProps = mergeProps(() => api().getPrevTriggerProps(viewProps), props)

  return <ark.button {...mergedProps} />
}
