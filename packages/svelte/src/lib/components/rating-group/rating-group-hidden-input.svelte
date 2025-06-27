<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface RatingGroupHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface RatingGroupHiddenInputProps extends Assign<HTMLProps<'input'>, RatingGroupHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRatingGroupContext } from './use-rating-group-context'

  let { ref = $bindable(null), ...props }: RatingGroupHiddenInputProps = $props()
  const ratingGroup = useRatingGroupContext()
  const mergedProps = $derived(mergeProps(ratingGroup().getHiddenInputProps(), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
