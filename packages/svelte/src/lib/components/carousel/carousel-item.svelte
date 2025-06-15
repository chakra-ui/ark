<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { ItemProps } from '@zag-js/carousel'

  export interface CarouselItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
  export interface CarouselItemProps extends Assign<HTMLProps<'div'>, CarouselItemBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  const props: CarouselItemProps = $props()

  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['index', 'snapAlign']))

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getItemProps(itemProps), localProps))
</script>

<Ark as="div" {...mergedProps} />
