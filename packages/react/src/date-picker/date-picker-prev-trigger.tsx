import type { ViewProps } from '@zag-js/date-picker/dist/date-picker.types'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerPrevTriggerProps = Assign<HTMLArkProps<'button'>, ViewProps>

export const DatePickerPrevTrigger = forwardRef<'button', ViewProps>((props, ref) => {
  const [viewProps, localProps] = createSplitProps<ViewProps>()(props, ['view'])
  const { getPrevTriggerProps } = useDatePickerContext()
  const mergedProps = mergeProps(getPrevTriggerProps(viewProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})
