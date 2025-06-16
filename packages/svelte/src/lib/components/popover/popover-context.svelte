<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePopoverContext } from './use-popover-context'

  export interface PopoverContextProps {
    render?: Snippet<[UsePopoverContext]>
  }
</script>

<script lang="ts">
  import { usePopoverContext } from './use-popover-context'

  const { render }: PopoverContextProps = $props()

  const context = usePopoverContext()
</script>

{@render render?.(context)}
