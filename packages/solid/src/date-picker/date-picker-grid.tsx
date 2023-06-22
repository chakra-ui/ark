import type { GridProps } from '@zag-js/date-picker/dist/date-picker.types'
import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerGridProps = Assign<HTMLArkProps<'div'>, GridProps>

export const DatePickerGrid = (props: DatePickerGridProps) => {
  const [gridProps, localProps] = createSplitProps<GridProps>()(props, ['view', 'columns', 'id'])
  const datePicker = useDatePickerContext()

  const mergedProps = mergeProps(
    () =>
      datePicker().getGridProps({ view: datePicker().view, id: createUniqueId(), ...gridProps }),
    localProps,
  )

  return <ark.div {...mergedProps} />
}
