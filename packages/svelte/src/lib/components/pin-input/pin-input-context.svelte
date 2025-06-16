<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePinInputContext } from './use-pin-input-context'

  export interface PinInputContextProps {
    render?: Snippet<[UsePinInputContext]>
  }
</script>

<script lang="ts">
  import { usePinInputContext } from './use-pin-input-context'

  const { render }: PinInputContextProps = $props()

  const context = usePinInputContext()
</script>

{@render render?.(context)}
