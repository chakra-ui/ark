<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface RatingGroupLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface RatingGroupLabelProps extends Assign<HTMLProps<'label'>, RatingGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRatingGroupContext } from './use-rating-group-context'

  let { ref = $bindable(), ...props }: RatingGroupLabelProps = $props()
  const ratingGroup = useRatingGroupContext()
  const mergedProps = $derived(mergeProps(ratingGroup().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
