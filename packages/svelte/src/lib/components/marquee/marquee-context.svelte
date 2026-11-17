<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseMarqueeContext } from './use-marquee-context.ts'

  export interface MarqueeContextProps {
    render?: Snippet<[UseMarqueeContext]>
    /**
     * @deprecated Use `render` instead.
     */
    children?: Snippet<[UseMarqueeContext]>
  }
</script>

<script lang="ts">
  import { useMarqueeContext } from './use-marquee-context.ts'

  const { render, children }: MarqueeContextProps = $props()

  const context = useMarqueeContext()
</script>

{@render (render ?? children)?.(context)}
