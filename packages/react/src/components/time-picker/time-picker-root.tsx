import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseTimePickerProps, useTimePicker } from './use-time-picker'
import { TimePickerProvider } from './use-time-picker-context'

export interface TimePickerRootBaseProps extends UseTimePickerProps, UsePresenceProps {}
export interface TimePickerRootProps extends Assign<HTMLArkProps<'div'>, TimePickerRootBaseProps> {}

export const TimePickerRoot = forwardRef<HTMLDivElement, TimePickerRootProps>((props, ref) => {
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
  const presence = usePresence(mergeProps({ present: timePicker.open }, presenceProps))
  const mergedProps = mergeProps(timePicker.getRootProps(), localProps)

  return (
    <TimePickerProvider value={timePicker}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </TimePickerProvider>
  )
})

TimePickerRoot.displayName = 'TimePickerRoot'
