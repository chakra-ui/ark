<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseMenuContext } from './use-menu-context'

  export interface MenuContextProps {
    render: Snippet<[UseMenuContext]>
  }
</script>

<script lang="ts">
  import { useMenuContext } from './use-menu-context'

  const { render }: MenuContextProps = $props()
  const context = useMenuContext()
</script>

{@render render(context)}
