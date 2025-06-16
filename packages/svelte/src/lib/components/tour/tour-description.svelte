<script module lang="ts">
  import type { HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TourDescriptionBaseProps extends PolymorphicProps<'div'> {}
  export interface TourDescriptionProps extends HTMLProps<'div'>, TourDescriptionBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTourContext } from './use-tour-context'

  const props: TourDescriptionProps = $props()

  const tour = useTourContext()
  const mergedProps = $derived(mergeProps(tour().getDescriptionProps(), props))
</script>

<Ark as="div" {...mergedProps}>
  {#if props.children}
    {@render props.children()}
  {:else}
    {tour().step?.description}
  {/if}
</Ark>
