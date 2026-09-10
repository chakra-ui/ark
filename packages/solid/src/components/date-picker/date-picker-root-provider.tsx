import type { RootState } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.tsx'
import type { UseDatePickerReturn } from './use-date-picker.ts'
import { DatePickerProvider } from './use-date-picker-context.ts'

interface RootProviderProps {
  value: UseDatePickerReturn
}

export interface DatePickerRootProviderState extends RootState {}

export interface DatePickerRootProviderBaseProps
  extends RootProviderProps, UsePresenceProps, PolymorphicProps<'div', DatePickerRootProviderState> {}
export interface DatePickerRootProviderProps extends HTMLProps<'div'>, DatePickerRootProviderBaseProps {}

export const DatePickerRootProvider = (props: DatePickerRootProviderProps) => {
  const [presenceProps, datePickerProps] = splitPresenceProps(props)
  const [{ value: datePicker }, localProps] = createSplitProps<RootProviderProps>()(datePickerProps, ['value'])
  const presence = usePresence(mergeProps(presenceProps, () => ({ present: datePicker().open })))
  const mergedProps = mergeProps(() => datePicker().getRootProps(), localProps)

  return (
    <DatePickerProvider value={datePicker}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} state={datePicker().getRootState()} />
      </PresenceProvider>
    </DatePickerProvider>
  )
}
