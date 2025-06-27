<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourBackdropBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TourBackdropProps extends HTMLProps<'div'>, TourBackdropBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresence } from '../presence'
  import { useTourContext } from './use-tour-context'
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'

  let { ref = $bindable(), ...props }: TourBackdropProps = $props()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const tour = useTourContext()
  const presence = usePresence(() => ({
    ...renderStrategyProps,
    present: tour().open,
  }))

  const mergedProps = $derived(mergeProps(tour().getBackdropProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} hidden={!tour().step?.backdrop} />
{/if}
