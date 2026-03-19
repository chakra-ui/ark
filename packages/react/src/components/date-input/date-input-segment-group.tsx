import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputSegmentGroupBaseProps extends PolymorphicProps {
  index?: number
}
export interface DateInputSegmentGroupProps extends HTMLProps<'div'>, DateInputSegmentGroupBaseProps {}

export const DateInputSegmentGroup = forwardRef<HTMLDivElement, DateInputSegmentGroupProps>(
  ({ index, ...props }, ref) => {
    const dateInput = useDateInputContext()
    const mergedProps = mergeProps(dateInput.getSegmentGroupProps({ index }), props)
    return <ark.div {...mergedProps} ref={ref} />
  },
)

DateInputSegmentGroup.displayName = 'DateInputSegmentGroup'
