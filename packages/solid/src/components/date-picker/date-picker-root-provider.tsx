import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
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

export interface DatePickerRootProviderBaseProps
  extends RootProviderProps,
    UsePresenceProps,
    PolymorphicProps<'div'> {}
export interface DatePickerRootProviderProps
  extends HTMLProps<'div'>,
    DatePickerRootProviderBaseProps {}

export const DatePickerRootProvider = (props: DatePickerRootProviderProps) => {
  const [presenceProps, datePickerProps] = splitPresenceProps(props)
  const [{ value: datePicker }, localProps] = createSplitProps<RootProviderProps>()(
    datePickerProps,
    ['value'],
  )
  const presence = usePresence(mergeProps(presenceProps, () => ({ present: datePicker().open })))
  const mergedProps = mergeProps(() => datePicker().getRootProps(), localProps)

  return (
    <DatePickerProvider value={datePicker}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </DatePickerProvider>
  )
}
