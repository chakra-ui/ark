import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseDateInputProps, useDateInput } from './use-date-input'
import { DateInputProvider } from './use-date-input-context'
import type { Assign } from '../../types'

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
