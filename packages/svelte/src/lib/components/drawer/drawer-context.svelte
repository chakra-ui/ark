<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseDrawerContext } from './use-drawer-context'

  export interface DrawerContextProps {
    children: Snippet<[UseDrawerContext]>
  }
</script>

<script lang="ts">
  import { useDrawerContext } from './use-drawer-context'

  const { children }: DrawerContextProps = $props()

  const drawer = useDrawerContext()
</script>

{@render children(drawer)}
