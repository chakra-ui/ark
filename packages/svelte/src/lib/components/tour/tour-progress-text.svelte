<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TourProgressTextBaseProps extends PolymorphicProps<'div'> {}
  export interface TourProgressTextProps extends HTMLProps<'div'>, TourProgressTextBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTourContext } from './use-tour-context'

  const props: TourProgressTextProps = $props()

  const tour = useTourContext()

  const mergedProps = $derived(mergeProps(tour().getProgressTextProps(), props))
</script>

<Ark as="div" {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {tour().getProgressText()}
  {/if}
</Ark>
