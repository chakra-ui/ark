import { mergeProps } from '@zag-js/solid'
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
    PolymorphicProps<'div'> {}
export interface TimePickerRootProviderProps
  extends HTMLProps<'div'>,
    TimePickerRootProviderBaseProps {}

export const TimePickerRootProvider = (props: TimePickerRootProviderProps) => {
  const [presenceProps, timePickerProps] = splitPresenceProps(props)
  const [{ value: timePicker }, localProps] = createSplitProps<RootProviderProps>()(
    timePickerProps,
    ['value'],
  )
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: timePicker().open })))
  const mergedProps = mergeProps(() => timePicker().getRootProps(), localProps)

  return (
    <TimePickerProvider value={timePicker}>
      <PresenceProvider value={apiPresence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </TimePickerProvider>
  )
}
