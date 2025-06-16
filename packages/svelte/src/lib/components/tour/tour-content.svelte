<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TourContentProps extends HTMLProps<'div'>, TourContentBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useTourContext } from './use-tour-context'

  let { ref = $bindable(), ...props }: TourContentProps = $props()

  const tour = useTourContext()
  const presence = usePresenceContext()

  const mergedProps = $derived(mergeProps(tour().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
    ref = node
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} {@attach setNode} />
{/if}
