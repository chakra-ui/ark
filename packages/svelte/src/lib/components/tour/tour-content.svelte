<script module lang="ts">
  import type { ContentState } from '@zag-js/tour'
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourContentState extends ContentState {}
  export interface TourContentBaseProps extends PolymorphicProps<'div', TourContentState>, RefAttribute {}
  export interface TourContentProps extends HTMLProps<'div'>, TourContentBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { useTourContext } from './use-tour-context.ts'

  let { ref = $bindable(null), ...props }: TourContentProps = $props()

  const tour = useTourContext()
  const presence = usePresenceContext()

  const mergedProps = $derived(mergeProps(tour().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} state={tour().getContentState()} />
{/if}
