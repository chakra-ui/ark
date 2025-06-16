<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface RatingGroupControlBaseProps extends PolymorphicProps<'div'> {}
  export interface RatingGroupControlProps extends Assign<HTMLProps<'div'>, RatingGroupControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRatingGroupContext } from './use-rating-group-context'

  const props: RatingGroupControlProps = $props()
  const ratingGroup = useRatingGroupContext()
  const mergedProps = $derived(mergeProps(ratingGroup().getControlProps(), props))
</script>

<Ark as="div" {...mergedProps} />
