<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseClipboardContext } from './use-clipboard-context'

  export interface ClipboardContextProps {
    render?: Snippet<[UseClipboardContext]>
  }
</script>

<script lang="ts">
  import { useClipboardContext } from './use-clipboard-context'

  const { render }: ClipboardContextProps = $props()

  const context = useClipboardContext()
</script>

{@render render?.(context)}
