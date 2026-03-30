import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseDateInputProps, useDateInput } from './use-date-input'
import { DateInputProvider } from './use-date-input-context'

export interface DateInputRootBaseProps extends UseDateInputProps, PolymorphicProps<'div'> {}
export interface DateInputRootProps extends HTMLProps<'div'>, DateInputRootBaseProps {}

export const DateInputRoot = (props: DateInputRootProps) => {
  const [useDateInputProps, localProps] = createSplitProps<UseDateInputProps>()(props, [
    'disabled',
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
    'createCalendar',
    'allSegments',
    'formatter',
    'placeholderValue',
    'defaultPlaceholderValue',
    'isDateUnavailable',
    'format',
  ])
  const api = useDateInput(useDateInputProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <DateInputProvider value={api}>
      <ark.div {...mergedProps} />
    </DateInputProvider>
  )
}
