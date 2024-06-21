import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
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

export interface TimePickerRootProviderBaseProps
  extends RootProviderProps,
    UsePresenceProps,
    PolymorphicProps {}
export interface TimePickerRootProviderProps
  extends HTMLProps<'div'>,
    TimePickerRootProviderBaseProps {}

export const TimePickerRootProvider = forwardRef<HTMLDivElement, TimePickerRootProviderProps>(
  (props, ref) => {
    const [presenceProps, timePickerProps] = splitPresenceProps(props)
    const [{ value: timePicker }, localProps] = createSplitProps<RootProviderProps>()(
      timePickerProps,
      ['value'],
    )
    const presence = usePresence(mergeProps({ present: timePicker.open }, presenceProps))
    const mergedProps = mergeProps(timePicker.getRootProps(), localProps)

    return (
      <TimePickerProvider value={timePicker}>
        <PresenceProvider value={presence}>
          <ark.div {...mergedProps} ref={ref} />
        </PresenceProvider>
      </TimePickerProvider>
    )
  },
)

TimePickerRootProvider.displayName = 'TimePickerRootProvider'
