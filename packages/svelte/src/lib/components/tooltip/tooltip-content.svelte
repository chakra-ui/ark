<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TooltipContentBaseProps extends PolymorphicProps<'div'> {}
  export interface TooltipContentProps extends Assign<HTMLProps<'div'>, TooltipContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useTooltipContext } from './use-tooltip-context'
  import { untrack } from 'svelte'

  const props: TooltipContentProps = $props()
  let ref: HTMLDivElement | null = $state(null)
  let called = $state(false)

  const tooltip = useTooltipContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(tooltip().getContentProps(), presence().getPresenceProps(), props))

  $effect(() => {
    const p = untrack(() => presence())
    p.setNode(ref)
  })
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} bind:ref />
{/if}
