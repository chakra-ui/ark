<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseRatingGroupReturn } from './use-rating-group.svelte'

  interface RootProviderProps {
    value: UseRatingGroupReturn
  }

  export interface RatingGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface RatingGroupRootProviderProps extends Assign<HTMLProps<'div'>, RatingGroupRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { RatingGroupProvider } from './use-rating-group-context'

  let { ref = $bindable(), ...props }: RatingGroupRootProviderProps = $props()
  const { value: ratingGroup, ...localProps } = props
  const mergedProps = $derived(mergeProps(ratingGroup().getRootProps(), localProps))

  RatingGroupProvider(ratingGroup)
</script>

<Ark as="div" bind:ref {...mergedProps} />
