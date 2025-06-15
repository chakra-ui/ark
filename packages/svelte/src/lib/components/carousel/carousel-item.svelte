<script module lang="ts">
  import type { ItemProps } from '@zag-js/carousel'
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CarouselItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
  export interface CarouselItemProps extends Assign<HTMLProps<'div'>, CarouselItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  let { index, snapAlign, ...props }: CarouselItemProps = $props()

  const carousel = useCarouselContext()
  const itemProps = $derived({ index, snapAlign })
  const mergedProps = $derived(mergeProps(carousel().getItemProps(itemProps), props))
</script>

<Ark as="div" {...mergedProps} />
