import type { ViewProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerViewTriggerProps = Assign<HTMLArkProps<'button'>, ViewProps>

export const DatePickerViewTrigger = forwardRef<HTMLButtonElement, DatePickerViewTriggerProps>(
  (props, ref) => {
    const [viewProps, localProps] = createSplitProps<ViewProps>()(props, ['view'])
    const { getViewTriggerProps, view } = useDatePickerContext()
    const mergedProps = mergeProps(
      getViewTriggerProps({ view: viewProps.view ?? view }),
      localProps,
    )

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerViewTrigger.displayName = 'DatePickerViewTrigger'
