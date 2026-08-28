<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/carousel'

  export interface CarouselItemBaseProps extends ItemProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface CarouselItemProps extends Assign<HTMLProps<'div'>, CarouselItemBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useCarouselContext } from './use-carousel-context.ts'

  let { ref = $bindable(null), ...props }: CarouselItemProps = $props()

  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['index', 'snapAlign']))

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getItemProps(itemProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
