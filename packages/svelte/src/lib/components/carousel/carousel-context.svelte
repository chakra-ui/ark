<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseCarouselReturn } from './use-carousel.svelte'

  export interface CarouselContextProps {
    value: UseCarouselReturn
    render: Snippet
  }
</script>

<script lang="ts">
  import { setContext } from 'svelte'

  let { value, render }: CarouselContextProps = $props()

  setContext('carousel', value)
</script>

{@render render()}
