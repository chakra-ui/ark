'use client'
import type { Assign } from '@ark-ui/react'
import { TimePicker } from '@ark-ui/react/time-picker'
import { type TimePickerVariantProps, timePicker } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(timePicker)

export interface RootProps
  extends Assign<JsxStyleProps, TimePicker.RootProps>,
    TimePickerVariantProps {}

export const Root = withProvider<HTMLDivElement, RootProps>(TimePicker.Root, 'root')

export const ClearTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, TimePicker.ClearTriggerProps>
>(TimePicker.ClearTrigger, 'clearTrigger')

export const Column = withContext<HTMLDivElement, Assign<JsxStyleProps, TimePicker.ColumnProps>>(
  TimePicker.Column,
  'column',
)

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, TimePicker.ContentProps>>(
  TimePicker.Content,
  'content',
)

export const Control = withContext<HTMLDivElement, Assign<JsxStyleProps, TimePicker.ControlProps>>(
  TimePicker.Control,
  'control',
)

export const HourCell = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, TimePicker.HourCellProps>
>(TimePicker.HourCell, 'hourCell')

export const Input = withContext<HTMLInputElement, Assign<JsxStyleProps, TimePicker.InputProps>>(
  TimePicker.Input,
  'input',
)

export const Label = withContext<HTMLLabelElement, Assign<JsxStyleProps, TimePicker.LabelProps>>(
  TimePicker.Label,
  'label',
)

export const MinuteCell = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, TimePicker.MinuteCellProps>
>(TimePicker.MinuteCell, 'minuteCell')

export const PeriodCell = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, TimePicker.PeriodCellProps>
>(TimePicker.PeriodCell, 'periodCell')

export const Positioner = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, TimePicker.PositionerProps>
>(TimePicker.Positioner, 'positioner')

export const SecondCell = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, TimePicker.SecondCellProps>
>(TimePicker.SecondCell, 'secondCell')

export const Spacer = withContext<HTMLDivElement, Assign<JsxStyleProps, TimePicker.SpacerProps>>(
  TimePicker.Spacer,
  'spacer',
)

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, TimePicker.TriggerProps>
>(TimePicker.Trigger, 'trigger')

export {
  TimePickerContext as Context,
  type TimePickerContextProps as ContextProps,
} from '@ark-ui/react/time-picker'
