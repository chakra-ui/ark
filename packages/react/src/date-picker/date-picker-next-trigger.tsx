import type { ViewProps } from '@zag-js/date-picker/dist/date-picker.types'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerNextTriggerProps = Assign<HTMLArkProps<'button'>, ViewProps>

export const DatePickerNextTrigger = forwardRef<'button', ViewProps>((props, ref) => {
  const [viewProps, localProps] = createSplitProps<ViewProps>()(props, ['view'])
  const { getNextTriggerProps } = useDatePickerContext()
  const mergedProps = mergeProps(getNextTriggerProps(viewProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})
