import type { ViewProps } from '@zag-js/date-picker/dist/date-picker.types'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerPrevTriggerProps = Assign<HTMLArkProps<'button'>, ViewProps>

export const DatePickerPrevTrigger = forwardRef<'button'>((props, ref) => {
  const { getPrevTriggerProps, view } = useDatePickerContext()
  const mergedProps = mergeProps(getPrevTriggerProps({ view }), props)

  return <ark.button {...mergedProps} ref={ref} />
})
