<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseRatingGroupProps } from './use-rating-group.svelte.ts'

  export interface RatingGroupRootBaseProps extends UseRatingGroupProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface RatingGroupRootProps extends Assign<HTMLProps<'div'>, RatingGroupRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { splitRatingGroupProps } from './split-rating-group-props.svelte.ts'
  import { useRatingGroup } from './use-rating-group.svelte.ts'
  import { RatingGroupProvider } from './use-rating-group-context.ts'

  let { ref = $bindable(null), value = $bindable(), ...props }: RatingGroupRootProps = $props()
  const providedId = $props.id()

  const [ratingGroupProps, localProps] = $derived(splitRatingGroupProps(props))

  const resolvedProps = $derived<UseRatingGroupProps>({
    ...ratingGroupProps,
    id: ratingGroupProps.id ?? providedId,
    value,
    onValueChange(details) {
      ratingGroupProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const ratingGroup = useRatingGroup(() => resolvedProps)
  const mergedProps = $derived(mergeProps(ratingGroup().getRootProps(), localProps))

  RatingGroupProvider(ratingGroup)
</script>

<Ark as="div" bind:ref {...mergedProps} />
