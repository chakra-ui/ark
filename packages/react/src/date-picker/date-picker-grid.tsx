import type { GridProps } from '@zag-js/date-picker/dist/date-picker.types'
import { mergeProps } from '@zag-js/react'
import { useId } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerGridProps = Assign<HTMLArkProps<'div'>, GridProps>

export const DatePickerGrid = forwardRef<'div', GridProps>((props, ref) => {
  const [gridProps, localProps] = createSplitProps<GridProps>()(props, ['view', 'columns', 'id'])
  const { getGridProps, view } = useDatePickerContext()
  const mergedProps = mergeProps(getGridProps({ view, id: useId(), ...gridProps }), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})
