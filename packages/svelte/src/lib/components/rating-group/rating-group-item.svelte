<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps, ItemState } from '@zag-js/rating-group'

  export interface RatingGroupItemState extends ItemState {}
  export interface RatingGroupItemBaseProps
    extends ItemProps, PolymorphicProps<'span', RatingGroupItemState>, RefAttribute {}
  export interface RatingGroupItemProps extends Assign<HTMLProps<'span'>, RatingGroupItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { useRatingGroupContext } from './use-rating-group-context.ts'
  import { RatingGroupItemProvider } from './use-rating-group-item-context.ts'

  let { ref = $bindable(null), ...props }: RatingGroupItemProps = $props()
  const ratingGroup = useRatingGroupContext()
  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['index']))

  const itemState = $derived(ratingGroup().getItemState(itemProps))
  const mergedProps = $derived(mergeProps(ratingGroup().getItemProps(itemProps), localProps))

  RatingGroupItemProvider(() => itemState)
</script>

<Ark as="span" bind:ref {...mergedProps} state={ratingGroup().getItemState(itemProps)} />
