<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseToggleGroupContext } from './use-toggle-group-context'

  export interface ToggleGroupContextProps {
    render: Snippet<[UseToggleGroupContext]>
  }
</script>

<script lang="ts">
  import { useToggleGroupContext } from './use-toggle-group-context'

  const { render }: ToggleGroupContextProps = $props()

  const context = useToggleGroupContext()
</script>

{@render render(context)}
