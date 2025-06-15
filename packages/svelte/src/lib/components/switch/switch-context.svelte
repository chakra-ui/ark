<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseSwitchContext } from './use-switch-context'

  export interface SwitchContextProps {
    render: Snippet<[UseSwitchContext]>
  }
</script>

<script lang="ts">
  import { useSwitchContext } from './use-switch-context'

  let { render }: SwitchContextProps = $props()

  const switchMachine = useSwitchContext()
</script>

{@render render(switchMachine)}
