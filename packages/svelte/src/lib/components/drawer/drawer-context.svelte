<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseDrawerContext } from './use-drawer-context.ts'

  export interface DrawerContextProps {
    render?: Snippet<[UseDrawerContext]>
    /**
     * @deprecated Use `render` instead.
     */
    children?: Snippet<[UseDrawerContext]>
  }
</script>

<script lang="ts">
  import { useDrawerContext } from './use-drawer-context.ts'

  const { render, children }: DrawerContextProps = $props()

  const drawer = useDrawerContext()
</script>

{@render (render ?? children)?.(drawer)}
