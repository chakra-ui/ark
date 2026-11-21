<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { CollectionItem } from '../collection/index.ts'
  import type { UseCommandContext } from './use-command-context.ts'

  export interface CommandContextProps<T extends CollectionItem> {
    render: Snippet<[UseCommandContext<T>]>
  }
</script>

<script lang="ts" generics="T extends CollectionItem = any">
  import { useCommandContext } from './use-command-context.ts'

  const { render }: CommandContextProps<T> = $props()

  const context = useCommandContext()
</script>

{@render render(context)}
