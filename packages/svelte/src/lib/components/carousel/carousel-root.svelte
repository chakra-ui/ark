<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseCarouselProps } from './use-carousel.svelte'

  export interface CarouselRootBaseProps extends UseCarouselProps, PolymorphicProps<'div'> {}
  export interface CarouselRootProps extends Assign<HTMLProps<'div'>, CarouselRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import CarouselContext from './carousel-context.svelte'
  import { splitCarouselProps } from './split-carousel-props.svelte'
  import { useCarousel } from './use-carousel.svelte'

  let { page = $bindable(), ...props }: CarouselRootProps = $props()
  const providedId = $props.id()

  const [useCarouselProps, localProps] = $derived(splitCarouselProps(props))

  const resolvedProps = $derived<UseCarouselProps>({
    ...useCarouselProps,
    id: useCarouselProps.id ?? providedId,
    page,
    onPageChange(details) {
      useCarouselProps.onPageChange?.(details)
      page = details.page
    },
  })

  const carousel = useCarousel(() => resolvedProps)
  const mergedProps = $derived(mergeProps(carousel().getRootProps(), localProps))
</script>

<CarouselContext value={carousel}>
  {#snippet render()}
    <Ark as="div" {...mergedProps} />
  {/snippet}
</CarouselContext>
