import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DatePickerPrevTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    DatePickerPrevTriggerBaseProps {}

export const DatePickerPrevTrigger = (props: DatePickerPrevTriggerProps) => {
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const mergedProps = mergeProps(() => api().getPrevTriggerProps(viewProps), props)

  return <ark.button {...mergedProps} />
}
