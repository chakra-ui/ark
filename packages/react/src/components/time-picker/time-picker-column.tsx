import { mergeProps } from '@zag-js/react'
import type { ColumnProps } from '@zag-js/time-picker'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

export interface TimePickerColumnBaseProps extends ColumnProps {}
export interface TimePickerColumnProps
  extends Assign<HTMLArkProps<'div'>, TimePickerColumnBaseProps> {}

export const TimePickerColumn = forwardRef<HTMLDivElement, TimePickerColumnProps>((props, ref) => {
  const [columnProps, localProps] = createSplitProps<ColumnProps>()(props, ['unit'])
  const timePicker = useTimePickerContext()
  const mergedProps = mergeProps(timePicker.getColumnProps(columnProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

TimePickerColumn.displayName = 'TimePickerColumn'
