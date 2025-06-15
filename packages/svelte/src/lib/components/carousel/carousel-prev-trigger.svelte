<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface CarouselPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface CarouselPrevTriggerProps extends Assign<HTMLProps<'button'>, CarouselPrevTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useCarouselContext } from './use-carousel-context'

  const props: CarouselPrevTriggerProps = $props()

  const carousel = useCarouselContext()
  const mergedProps = $derived(mergeProps(carousel().getPrevTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
