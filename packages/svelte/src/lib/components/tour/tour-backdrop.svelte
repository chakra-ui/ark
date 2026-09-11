<script module lang="ts">
  import type { BackdropState } from '@zag-js/tour'
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourBackdropState extends BackdropState {}
  export interface TourBackdropBaseProps extends PolymorphicProps<'div', TourBackdropState>, RefAttribute {}
  export interface TourBackdropProps extends HTMLProps<'div'>, TourBackdropBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresence } from '../presence/index.ts'
  import { useTourContext } from './use-tour-context.ts'
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'

  let { ref = $bindable(null), ...props }: TourBackdropProps = $props()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const tour = useTourContext()
  const presence = usePresence(() => ({
    ...renderStrategyProps(),
    present: tour().open,
  }))

  const mergedProps = $derived(mergeProps(tour().getBackdropProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark
    as="div"
    bind:ref
    {...mergedProps}
    {@attach setNode}
    hidden={!tour().step?.backdrop}
    state={tour().getBackdropState()}
  />
{/if}
