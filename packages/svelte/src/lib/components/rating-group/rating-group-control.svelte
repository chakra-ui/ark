<script module lang="ts">
  import type { ControlState } from '@zag-js/rating-group'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface RatingGroupControlState extends ControlState {}
  export interface RatingGroupControlBaseProps extends PolymorphicProps<'div', RatingGroupControlState>, RefAttribute {}
  export interface RatingGroupControlProps extends Assign<HTMLProps<'div'>, RatingGroupControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useRatingGroupContext } from './use-rating-group-context.ts'

  let { ref = $bindable(null), ...props }: RatingGroupControlProps = $props()
  const ratingGroup = useRatingGroupContext()
  const mergedProps = $derived(mergeProps(ratingGroup().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} state={ratingGroup().getControlState()} />
