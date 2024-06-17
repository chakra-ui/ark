import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerViewTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DatePickerViewTriggerProps
  extends HTMLProps<'button'>,
    DatePickerViewTriggerBaseProps {}

export const DatePickerViewTrigger = (props: DatePickerViewTriggerProps) => {
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const mergedProps = mergeProps(() => api().getViewTriggerProps(viewProps), props)

  return <ark.button {...mergedProps} />
}
