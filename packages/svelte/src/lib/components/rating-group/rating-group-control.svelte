<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface RatingGroupControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface RatingGroupControlProps extends Assign<HTMLProps<'div'>, RatingGroupControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRatingGroupContext } from './use-rating-group-context'

  let { ref = $bindable(), ...props }: RatingGroupControlProps = $props()
  const ratingGroup = useRatingGroupContext()
  const mergedProps = $derived(mergeProps(ratingGroup().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
