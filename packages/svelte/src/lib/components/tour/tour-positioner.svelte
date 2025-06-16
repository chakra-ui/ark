<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TourPositionerBaseProps extends PolymorphicProps<'div'> {}
  export interface TourPositionerProps extends HTMLProps<'div'>, TourPositionerBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { usePresenceContext } from '../presence'
  import { useTourContext } from './use-tour-context'

  const props: TourPositionerProps = $props()

  const tour = useTourContext()
  const presence = usePresenceContext()

  const mergedProps = $derived(mergeProps(tour().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" {...mergedProps} />
{/if}
