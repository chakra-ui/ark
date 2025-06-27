<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TourTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface TourTitleProps extends HTMLProps<'h2'>, TourTitleBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTourContext } from './use-tour-context'

  let { ref = $bindable(null), ...props }: TourTitleProps = $props()

  const tour = useTourContext()

  const mergedProps = $derived(mergeProps(tour().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {tour().step?.title}
  {/if}
</Ark>
