import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerRowHeaderProps = HTMLArkProps<'div'>

export const DatePickerRowHeader = forwardRef<'div'>((props, ref) => {
  const { getHeaderProps } = useDatePickerContext()
  const mergedProps = mergeProps(getHeaderProps({ view: 'day' }), props)

  return <ark.div role="row" {...mergedProps} aria-hidden={false} ref={ref} />
})
