<script module lang="ts">
  import type { Snippet } from 'svelte'

  export interface CarouselContextProps {
    render: Snippet<[UseCarouselContext]>
  }
</script>

<script lang="ts">
  import { useCarouselContext, type UseCarouselContext } from './use-carousel-context'

  let { render }: CarouselContextProps = $props()

  const carousel = useCarouselContext()
</script>

{@render render(carousel)}
