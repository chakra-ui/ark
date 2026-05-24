<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseToggleGroupContext } from './use-toggle-group-context.ts'

  export interface ToggleGroupContextProps {
    render: Snippet<[UseToggleGroupContext]>
  }
</script>

<script lang="ts">
  import { useToggleGroupContext } from './use-toggle-group-context.ts'

  const { render }: ToggleGroupContextProps = $props()

  const context = useToggleGroupContext()
</script>

{@render render(context)}
