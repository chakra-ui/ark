'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { usePresenceContext } from '../presence/index.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import type { ContentState } from '@zag-js/date-picker'

export interface DatePickerContentState extends ContentState {}

export interface DatePickerContentBaseProps extends PolymorphicProps<DatePickerContentState> {}
export interface DatePickerContentProps extends HTMLProps<'div'>, DatePickerContentBaseProps {}

export const DatePickerContent = forwardRef<HTMLDivElement, DatePickerContentProps>((props, ref) => {
  const datePicker = useDatePickerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(datePicker.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} state={datePicker.getContentState()} />
    </PresenceGate>
  )
})

DatePickerContent.displayName = 'DatePickerContent'
