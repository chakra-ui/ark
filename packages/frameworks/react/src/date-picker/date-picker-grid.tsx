import type { GridProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useId } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerGridProps extends Assign<HTMLArkProps<'div'>, GridProps> {}

export const DatePickerGrid = forwardRef<HTMLDivElement, DatePickerGridProps>((props, ref) => {
  const [gridProps, localProps] = createSplitProps<GridProps>()(props, ['view', 'columns', 'id'])

  const api = useDatePickerContext()
  const mergedProps = mergeProps(
    api.getGridProps({ view: api.view, id: useId(), ...gridProps }),
    localProps,
  )

  return <ark.div {...mergedProps} ref={ref} />
})

DatePickerGrid.displayName = 'DatePickerGrid'
