<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { UseDateInputProps } from './use-date-input.svelte.js'

  export interface DateInputRootBaseProps extends UseDateInputProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface DateInputRootProps extends Assign<HTMLProps<'div'>, DateInputRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useDateInput } from './use-date-input.svelte.js'
  import { DateInputProvider } from './use-date-input-context.js'

  let { ref = $bindable(null), value = $bindable(), ...props }: DateInputRootProps = $props()
  const providedId = $props.id()

  const [useDateInputProps, localProps] = $derived(
    createSplitProps<UseDateInputProps>()(props, [
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
      'allSegments',
      'formatter',
      'placeholderValue',
      'defaultPlaceholderValue',
      'format',
    ]),
  )

  const resolvedProps = $derived<UseDateInputProps>({
    ...useDateInputProps,
    id: useDateInputProps.id ?? providedId,
    value,
    onValueChange(details) {
      useDateInputProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const dateInput = useDateInput(() => resolvedProps)
  const mergedProps = $derived(mergeProps(dateInput().getRootProps(), localProps))

  DateInputProvider(dateInput)
</script>

<Ark as="div" bind:ref {...mergedProps} />
