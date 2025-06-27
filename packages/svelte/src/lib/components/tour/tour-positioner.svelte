<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TourPositionerProps extends HTMLProps<'div'>, TourPositionerBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useTourContext } from './use-tour-context'

  let { ref = $bindable(), ...props }: TourPositionerProps = $props()

  const tour = useTourContext()
  const presence = usePresenceContext()

  const mergedProps = $derived(mergeProps(tour().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
