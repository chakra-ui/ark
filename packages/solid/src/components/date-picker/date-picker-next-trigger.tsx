import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerNextTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DatePickerNextTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    DatePickerNextTriggerBaseProps {}

export const DatePickerNextTrigger = (props: DatePickerNextTriggerProps) => {
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const mergedProps = mergeProps(() => api().getNextTriggerProps(viewProps), props)

  return <ark.button {...mergedProps} />
}
