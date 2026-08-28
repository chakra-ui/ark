<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseToggleContext } from './use-toggle-context.ts'

  export interface ToggleContextProps {
    render: Snippet<[UseToggleContext]>
  }
</script>

<script lang="ts">
  import { useToggleContext } from './use-toggle-context.ts'

  const { render }: ToggleContextProps = $props()

  const context = useToggleContext()
</script>

{@render render(context)}
