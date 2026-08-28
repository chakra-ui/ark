<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseMarqueeContext } from './use-marquee-context.ts'

  export interface MarqueeContextProps {
    children: Snippet<[UseMarqueeContext]>
  }
</script>

<script lang="ts">
  import { useMarqueeContext } from './use-marquee-context.ts'

  let { children }: MarqueeContextProps = $props()

  const context = useMarqueeContext()
</script>

{@render children(context)}
