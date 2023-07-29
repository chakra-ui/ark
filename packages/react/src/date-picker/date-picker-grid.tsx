import type { GridProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerGridProps = Assign<ComponentPropsWithoutRef<typeof ark.div>, GridProps>

export const DatePickerGrid = forwardRef<HTMLDivElement, DatePickerGridProps>((props, ref) => {
  const [gridProps, localProps] = createSplitProps<GridProps>()(props, ['view', 'columns', 'id'])
  const { getGridProps, view } = useDatePickerContext()
  const mergedProps = mergeProps(getGridProps({ view, id: useId(), ...gridProps }), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

DatePickerGrid.displayName = 'DatePickerGrid'
