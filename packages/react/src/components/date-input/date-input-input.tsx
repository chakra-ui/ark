import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputInputBaseProps extends PolymorphicProps {
  index?: number
}
export interface DateInputInputProps extends HTMLProps<'div'>, DateInputInputBaseProps {}

export const DateInputInput = forwardRef<HTMLDivElement, DateInputInputProps>(({ index, ...props }, ref) => {
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(dateInput.getSegmentGroupProps({ index }), props)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {dateInput.getSegments({ index }).map((segment, i) => (
        <ark.span key={i} {...dateInput.getSegmentProps({ segment, index })}>
          {segment.text}
        </ark.span>
      ))}
    </ark.div>
  )
})

DateInputInput.displayName = 'DateInputInput'
