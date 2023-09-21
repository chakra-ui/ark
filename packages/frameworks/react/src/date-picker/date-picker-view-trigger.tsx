import type { ViewProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerViewTriggerProps extends Assign<HTMLArkProps<'button'>, ViewProps> {}

export const DatePickerViewTrigger = forwardRef<HTMLButtonElement, DatePickerViewTriggerProps>(
  (props, ref) => {
    const [viewProps, localProps] = createSplitProps<ViewProps>()(props, ['view'])

    const api = useDatePickerContext()
    const mergedProps = mergeProps(
      api.getViewTriggerProps({ view: viewProps.view ?? api.view }),
      localProps,
    )

    return <ark.button {...mergedProps} ref={ref} />
  },
)

DatePickerViewTrigger.displayName = 'DatePickerViewTrigger'
