<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseCommandItemContext } from './use-command-item-context.ts'

  export interface CommandItemContextProps {
    render: Snippet<[UseCommandItemContext]>
  }
</script>

<script lang="ts">
  import { useCommandItemContext } from './use-command-item-context.ts'

  const { render }: CommandItemContextProps = $props()

  const context = useCommandItemContext()
</script>

{@render render(context)}
