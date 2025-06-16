<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseTooltipContext } from './use-tooltip-context'

  export interface TooltipContextProps {
    render?: Snippet<[UseTooltipContext]>
  }
</script>

<script lang="ts">
  import { useTooltipContext } from './use-tooltip-context'

  const { render }: TooltipContextProps = $props()

  const context = useTooltipContext()
</script>

{@render render?.(context)}
