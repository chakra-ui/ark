<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseMenuContext } from './use-menu-context.ts'

  export interface MenuContextProps {
    render: Snippet<[UseMenuContext]>
  }
</script>

<script lang="ts">
  import { useMenuContext } from './use-menu-context.ts'

  const { render }: MenuContextProps = $props()
  const context = useMenuContext()
</script>

{@render render(context)}
