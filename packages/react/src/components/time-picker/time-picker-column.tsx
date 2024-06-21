import { mergeProps } from '@zag-js/react'
import type { ColumnProps } from '@zag-js/time-picker'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerColumnBaseProps extends ColumnProps, PolymorphicProps {}
export interface TimePickerColumnProps extends HTMLProps<'div'>, TimePickerColumnBaseProps {}

export const TimePickerColumn = forwardRef<HTMLDivElement, TimePickerColumnProps>((props, ref) => {
  const [columnProps, localProps] = createSplitProps<ColumnProps>()(props, ['unit'])
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(timePicker.getColumnProps(columnProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

TimePickerColumn.displayName = 'TimePickerColumn'
