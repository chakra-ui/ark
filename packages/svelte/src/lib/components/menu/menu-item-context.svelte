<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useMenuItemContext, type UseMenuItemContext } from './use-menu-item-context'

  export interface MenuItemContextProps {
    render: Snippet<[UseMenuItemContext]>
  }

  const props: MenuItemContextProps = $props()

  const context = useMenuItemContext()
</script>

{@render props.render(context)}
