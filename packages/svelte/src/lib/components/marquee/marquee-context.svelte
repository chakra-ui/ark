<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseMarqueeContext } from './use-marquee-context'

  export interface MarqueeContextProps {
    children: Snippet<[UseMarqueeContext]>
  }
</script>

<script lang="ts">
  import { useMarqueeContext } from './use-marquee-context'

  let { children }: MarqueeContextProps = $props()

  const context = useMarqueeContext()
</script>

{@render children(context)}
