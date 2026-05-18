'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseDateInputProps, useDateInput } from './use-date-input.ts'
import { DateInputProvider } from './use-date-input-context.ts'
import type { Assign } from '../../types.ts'

export interface DateInputRootBaseProps extends UseDateInputProps, PolymorphicProps {}
export interface DateInputRootProps extends Assign<HTMLProps<'div'>, DateInputRootBaseProps> {}

const splitRootProps = createSplitProps<UseDateInputProps>()

export const DateInputRoot = forwardRef<HTMLDivElement, DateInputRootProps>((props, ref) => {
  const [useDateInputProps, localProps] = splitRootProps(props, [
    'dir',
    'disabled',
    'getRootNode',
    'id',
    'ids',
    'invalid',
    'locale',
    'max',
    'min',
    'name',
    'form',
    'onFocusChange',
    'onPlaceholderChange',
    'onValueChange',
    'readOnly',
    'required',
    'selectionMode',
    'timeZone',
    'hideTimeZone',
    'translations',
    'value',
    'defaultValue',
    'hourCycle',
    'granularity',
    'shouldForceLeadingZeros',
    'allSegments',
    'formatter',
    'placeholderValue',
    'defaultPlaceholderValue',
    'format',
    'createCalendar',
    'isDateUnavailable',
  ])
  const dateInput = useDateInput(useDateInputProps)
  const mergedProps = mergeProps(dateInput.getRootProps(), localProps)

  return (
    <DateInputProvider value={dateInput}>
      <ark.div {...mergedProps} ref={ref} />
    </DateInputProvider>
  )
})

DateInputRoot.displayName = 'DateInputRoot'
