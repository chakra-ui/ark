<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseMenubarContext } from './use-menubar-context.ts'

  export interface MenubarContextProps {
    api?: Snippet<[UseMenubarContext]>
  }
</script>

<script lang="ts">
  import { useMenubarContext } from './use-menubar-context.ts'

  const { api }: MenubarContextProps = $props()
  const menubar = useMenubarContext()
</script>

{@render api?.(menubar)}
