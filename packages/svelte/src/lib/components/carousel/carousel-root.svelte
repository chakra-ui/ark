<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseCarouselProps } from './use-carousel.svelte'

  export interface CarouselRootBaseProps extends UseCarouselProps, PolymorphicProps<'div'> {}
  export interface CarouselRootProps extends Assign<HTMLProps<'div'>, CarouselRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarousel } from './use-carousel.svelte'
  import { CarouselProvider } from './use-carousel-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { page = $bindable(), ...props }: CarouselRootProps = $props()
  const providedId = $props.id()

  const [useCarouselProps, localProps] = $derived(
    createSplitProps<UseCarouselProps>()(props, [
      'allowMouseDrag',
      'autoplay',
      'defaultPage',
      'id',
      'ids',
      'inViewThreshold',
      'loop',
      'onAutoplayStatusChange',
      'onDragStatusChange',
      'onPageChange',
      'orientation',
      'padding',
      'page',
      'slideCount',
      'slidesPerMove',
      'slidesPerPage',
      'snapType',
      'spacing',
      'translations',
    ]),
  )

  const resolvedProps = $derived<UseCarouselProps>({
    ...useCarouselProps,
    id: useCarouselProps.id ?? providedId,
    page,
    onPageChange(details) {
      useCarouselProps.onPageChange?.(details)
      if (page !== undefined) page = details.page
    },
  })

  const carousel = useCarousel(() => resolvedProps)
  const mergedProps = $derived(mergeProps(carousel().getRootProps(), localProps))

  CarouselProvider(carousel)
</script>

<Ark as="div" {...mergedProps} />
