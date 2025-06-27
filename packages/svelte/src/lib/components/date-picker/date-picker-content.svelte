<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerContentProps extends Assign<HTMLProps<'div'>, DatePickerContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { usePresenceContext } from '../presence/index.js'

  let { ref = $bindable(), ...props }: DatePickerContentProps = $props()

  const datePicker = useDatePickerContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(datePicker().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: HTMLElement) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
