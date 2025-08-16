<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseScrollAreaContext } from './use-scroll-area-context.js'

  export interface ScrollAreaContextProps {
    render: Snippet<[UseScrollAreaContext]>
  }
</script>

<script lang="ts">
  import { useScrollAreaContext } from './use-scroll-area-context.js'

  let { render }: ScrollAreaContextProps = $props()

  const context = useScrollAreaContext()
</script>

{@render render(context)}