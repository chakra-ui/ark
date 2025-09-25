<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SelectPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectPositionerProps extends Assign<HTMLProps<'div'>, SelectPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { usePresenceContext } from '../presence'
  import { useSelectContext } from './use-select-context'

  let { ref = $bindable(null), ...props }: SelectPositionerProps = $props()
  const select = useSelectContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(select().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
