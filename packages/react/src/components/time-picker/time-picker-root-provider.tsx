import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseTimePickerReturn } from './use-time-picker'
import { TimePickerProvider } from './use-time-picker-context'

interface RootProviderProps {
  value: UseTimePickerReturn
}

export interface TimePickerRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface TimePickerRootProviderProps
  extends HTMLProps<'div'>,
    TimePickerRootProviderBaseProps {}

export const TimePickerRootProvider = forwardRef<HTMLDivElement, TimePickerRootProviderProps>(
  (props, ref) => {
    const [presenceProps, TimePickerProps] = splitPresenceProps(props)
    const [{ value: TimePicker }, localProps] = createSplitProps<RootProviderProps>()(
      TimePickerProps,
      ['value'],
    )
    const presence = usePresence(mergeProps({ present: TimePicker.open }, presenceProps))
    const mergedProps = mergeProps(TimePicker.getRootProps(), localProps)

    return (
      <TimePickerProvider value={TimePicker}>
        <PresenceProvider value={presence}>
          <ark.div {...mergedProps} ref={ref} />
        </PresenceProvider>
      </TimePickerProvider>
    )
  },
)

TimePickerRootProvider.displayName = 'TimePickerRootProvider'
