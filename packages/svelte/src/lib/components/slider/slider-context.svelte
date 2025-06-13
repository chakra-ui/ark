<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseSliderContext } from './use-slider-context'

  export interface SliderContextProps {
    render?: Snippet<[UseSliderContext]>
  }
</script>

<script lang="ts">
  import { useSliderContext } from './use-slider-context'

  const { render }: SliderContextProps = $props()
  const slider = useSliderContext()
</script>

{@render render?.(slider)}
