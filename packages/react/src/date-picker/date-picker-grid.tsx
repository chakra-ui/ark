import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerGridProps = HTMLArkProps<'div'>

export const DatePickerGrid = forwardRef<'div'>((props, ref) => {
  const { getGridProps, view } = useDatePickerContext()
  const mergedProps = mergeProps(getGridProps({ view }), props)

  return <ark.div {...mergedProps} ref={ref} />
})
