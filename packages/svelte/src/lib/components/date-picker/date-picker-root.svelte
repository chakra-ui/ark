<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'
  import type { UseDatePickerProps } from './use-date-picker.svelte.js'
  import type { UsePresenceProps } from '../presence/index.js'

  export interface DatePickerRootBaseProps extends UseDatePickerProps, UsePresenceProps, PolymorphicProps<'div'> {}
  export interface DatePickerRootProps extends Assign<HTMLProps<'div'>, DatePickerRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { PresenceProvider, splitPresenceProps, usePresence } from '../presence/index.js'
  import { useDatePicker } from './use-date-picker.svelte.js'
  import { DatePickerProvider } from './use-date-picker-context.js'

  let {
    value = $bindable(),
    focusedValue = $bindable(),
    open = $bindable(),
    view = $bindable(),
    ...props
  }: DatePickerRootProps = $props()
  const providedId = $props.id()

  const [presenceProps, datePickerProps] = $derived(splitPresenceProps(props))
  const [useDatePickerProps, localProps] = $derived(
    createSplitProps<UseDatePickerProps>()(datePickerProps, [
      'closeOnSelect',
      'defaultFocusedValue',
      'defaultOpen',
      'defaultValue',
      'defaultView',
      'disabled',
      'fixedWeeks',
      'focusedValue',
      'format',
      'id',
      'ids',
      'isDateUnavailable',
      'locale',
      'max',
      'maxView',
      'min',
      'minView',
      'name',
      'numOfMonths',
      'onFocusChange',
      'onOpenChange',
      'onValueChange',
      'onViewChange',
      'open',
      'outsideDaySelectable',
      'parse',
      'placeholder',
      'positioning',
      'readOnly',
      'selectionMode',
      'startOfWeek',
      'timeZone',
      'translations',
      'value',
      'view',
    ]),
  )

  $inspect(useDatePickerProps)

  const resolvedProps = $derived<UseDatePickerProps>({
    ...useDatePickerProps,
    id: useDatePickerProps.id ?? providedId,
    value,
    onValueChange(details) {
      useDatePickerProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
    focusedValue,
    onFocusChange(details) {
      useDatePickerProps.onFocusChange?.(details)
      if (focusedValue !== undefined) focusedValue = details.focusedValue
    },
    open,
    onOpenChange(details) {
      useDatePickerProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
    view,
    onViewChange(details) {
      useDatePickerProps.onViewChange?.(details)
      if (view !== undefined) view = details.view
    },
  })

  const datePicker = useDatePicker(() => resolvedProps)
  const presence = usePresence(() => ({ present: datePicker().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps(datePicker().getRootProps(), localProps))

  DatePickerProvider(datePicker)
  PresenceProvider(presence)
</script>

<Ark as="div" {...mergedProps} />
