import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseDatePickerReturn } from './use-date-picker'
import { DatePickerProvider } from './use-date-picker-context'

interface RootProviderProps {
  value: UseDatePickerReturn
}

export interface DatePickerRootProviderProps
  extends HTMLArkProps<'div'>,
    RootProviderProps,
    UsePresenceProps {}

export const DatePickerRootProvider = forwardRef<HTMLDivElement, DatePickerRootProviderProps>(
  (props, ref) => {
    const [presenceProps, datePickerProps] = splitPresenceProps(props)
    const [{ value: datePicker }, localProps] = createSplitProps<RootProviderProps>()(
      datePickerProps,
      ['value'],
    )
    const presence = usePresence(mergeProps({ present: datePicker.open }, presenceProps))
    const mergedProps = mergeProps(datePicker.getRootProps(), localProps)

    return (
      <DatePickerProvider value={datePicker}>
        <PresenceProvider value={presence}>
          <ark.div {...mergedProps} ref={ref} />
        </PresenceProvider>
      </DatePickerProvider>
    )
  },
)

DatePickerRootProvider.displayName = 'DatePickerRootProvider'
