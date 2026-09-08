'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.ts'
import type { UseDatePickerReturn } from './use-date-picker.ts'
import { DatePickerProvider } from './use-date-picker-context.ts'
import type { RootState } from '@zag-js/date-picker'

interface RootProviderProps {
  value: UseDatePickerReturn
}

export interface DatePickerRootProviderState extends RootState {}

export interface DatePickerRootProviderBaseProps
  extends RootProviderProps, UsePresenceProps, PolymorphicProps<DatePickerRootProviderState> {}
export interface DatePickerRootProviderProps extends HTMLProps<'div'>, DatePickerRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const DatePickerRootProvider = forwardRef<HTMLDivElement, DatePickerRootProviderProps>((props, ref) => {
  const [presenceProps, datePickerProps] = splitPresenceProps(props)
  const [{ value: datePicker }, localProps] = splitRootProviderProps(datePickerProps, ['value'])

  const presence = usePresence(mergeProps({ present: datePicker.open }, presenceProps))
  const mergedProps = mergeProps(datePicker.getRootProps(), localProps)

  return (
    <DatePickerProvider value={datePicker}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} state={datePicker.getRootState()} />
      </PresenceProvider>
    </DatePickerProvider>
  )
})

DatePickerRootProvider.displayName = 'DatePickerRootProvider'
