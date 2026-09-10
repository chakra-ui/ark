<script module lang="ts">
  import type { TriggerState } from '@zag-js/select'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectTriggerState extends TriggerState {}
  export interface SelectTriggerBaseProps extends PolymorphicProps<'button', SelectTriggerState>, RefAttribute {}
  export interface SelectTriggerProps extends Assign<HTMLProps<'button'>, SelectTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { useSelectContext } from './use-select-context.ts'

  let { ref = $bindable(null), ...props }: SelectTriggerProps = $props()
  const select = useSelectContext()
  const mergedProps = $derived(mergeProps(select().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} state={select().getTriggerState()} />
