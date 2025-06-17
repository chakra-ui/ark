import { mergeProps } from '@zag-js/solid'
import { uniq } from '@zag-js/utils'
import { createMemo } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerRangeTextBaseProps extends PolymorphicProps<'div'> {}
export interface DatePickerRangeTextProps extends HTMLProps<'div'>, DatePickerRangeTextBaseProps {}

export const DatePickerRangeText = (props: DatePickerRangeTextProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getRangeTextProps(), props)
  const visibleRangeText = createMemo(() => {
    const { start, end } = api().visibleRangeText
    return uniq([start, end]).filter(Boolean).join(' - ')
  })

  return <ark.div {...mergedProps}>{visibleRangeText()}</ark.div>
}
