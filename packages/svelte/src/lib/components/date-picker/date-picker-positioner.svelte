<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerPositionerProps extends Assign<HTMLProps<'div'>, DatePickerPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { usePresenceContext } from '../presence/index.js'

  let { ref = $bindable(null), ...props }: DatePickerPositionerProps = $props()

  const datePicker = useDatePickerContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(datePicker().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
