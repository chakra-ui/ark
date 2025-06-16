<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TourArrowBaseProps extends PolymorphicProps<'div'> {}
  export interface TourArrowProps extends HTMLProps<'div'>, TourArrowBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTourContext } from './use-tour-context'

  const props: TourArrowProps = $props()

  const tour = useTourContext()

  const mergedProps = $derived(mergeProps(tour().getArrowProps(), props))
</script>

{#if tour().step?.arrow}
  <Ark as="div" {...mergedProps} />
{/if}
