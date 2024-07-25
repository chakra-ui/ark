import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseTimePickerProps, useTimePicker } from './use-time-picker'
import { TimePickerProvider } from './use-time-picker-context'

export interface TimePickerRootBaseProps
  extends UseTimePickerProps,
    UsePresenceProps,
    PolymorphicProps<'div'> {}
export interface TimePickerRootProps extends Assign<HTMLProps<'div'>, TimePickerRootBaseProps> {}

export const TimePickerRoot = (props: TimePickerRootProps) => {
  const [presenceProps, timePickerProps] = splitPresenceProps(props)
  const [useTimePickerProps, localProps] = createSplitProps<UseTimePickerProps>()(timePickerProps, [
    'allowSeconds',
    'defaultOpen',
    'defaultValue',
    'disableLayer',
    'disabled',
    'id',
    'ids',
    'locale',
    'max',
    'min',
    'name',
    'onFocusChange',
    'onOpenChange',
    'onValueChange',
    'open',
    'placeholder',
    'positioning',
    'readOnly',
    'steps',
    'value',
  ])

  const timePicker = useTimePicker(useTimePickerProps)
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
