<script module lang="ts">
  import type { PositionerState } from '@zag-js/tour'
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourPositionerState extends PositionerState {}
  export interface TourPositionerBaseProps extends PolymorphicProps<'div', TourPositionerState>, RefAttribute {}
  export interface TourPositionerProps extends HTMLProps<'div'>, TourPositionerBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { usePresenceContext } from '../presence/index.ts'
  import { useTourContext } from './use-tour-context.ts'

  let { ref = $bindable(null), ...props }: TourPositionerProps = $props()

  const tour = useTourContext()
  const presence = usePresenceContext()

  const mergedProps = $derived(mergeProps(tour().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} state={tour().getPositionerState()} />
{/if}
