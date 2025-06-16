<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface RatingGroupLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface RatingGroupLabelProps extends Assign<HTMLProps<'label'>, RatingGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRatingGroupContext } from './use-rating-group-context'

  const props: RatingGroupLabelProps = $props()
  const ratingGroup = useRatingGroupContext()
  const mergedProps = $derived(mergeProps(ratingGroup().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
