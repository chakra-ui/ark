import type * as dateInput from '@zag-js/date-input'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputSegmentBaseProps extends PolymorphicProps<'span'> {
  segment: dateInput.DateSegment
  index?: number
}
export interface DateInputSegmentProps extends HTMLProps<'span'>, DateInputSegmentBaseProps {}

export const DateInputSegment = ({ segment, index, ...props }: DateInputSegmentProps) => {
  const api = useDateInputContext()
  const mergedProps = mergeProps(() => {
    const segProps = api().getSegmentProps({ segment, index })
    const origKeyDown = segProps.onKeyDown
    if (origKeyDown) {
      return {
        ...segProps,
        onKeyDown: (e: KeyboardEvent) => {
          ;(e as any).nativeEvent ??= e
          return origKeyDown(e)
        },
      }
    }
    return segProps
  }, props)
  return <ark.span {...mergedProps}>{segment.text}</ark.span>
}
