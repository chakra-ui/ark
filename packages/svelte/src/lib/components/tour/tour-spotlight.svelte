<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourSpotlightBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TourSpotlightProps extends HTMLProps<'div'>, TourSpotlightBaseProps {}
</script>

<script lang="ts">
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresence } from '../presence'
  import { useTourContext } from './use-tour-context'

  let { ref = $bindable(), ...props }: TourSpotlightProps = $props()

  const tour = useTourContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence(() => ({
    present: tour().open,
    ...renderStrategyProps,
  }))

  const mergedProps = $derived(mergeProps(tour().getSpotlightProps(), presence().getPresenceProps(), props))
  const hidden = $derived(!tour().open || !tour().step?.target?.())

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} {hidden} />
{/if}
