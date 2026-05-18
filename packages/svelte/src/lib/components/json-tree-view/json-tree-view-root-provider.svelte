<script lang="ts">
  import type { JsonNode } from '@zag-js/json-tree-utils'
  import { TreeViewRootProvider, type TreeViewRootProviderProps } from '../tree-view/index.ts'
  import { JsonTreeViewPropsProvider } from './json-tree-view-props-context.ts'
  import type { UseJsonTreeViewReturn } from './use-json-tree-view.svelte.ts'

  export interface JsonTreeViewRootProviderProps extends TreeViewRootProviderProps<JsonNode> {}

  const { value, ...props }: JsonTreeViewRootProviderProps = $props()

  const jsonTreeView = $derived(value() as unknown as UseJsonTreeViewReturn)

  JsonTreeViewPropsProvider(() => jsonTreeView().options)
</script>

<TreeViewRootProvider data-scope="json-tree-view" value={jsonTreeView} {...props}>
  {@render props.children?.()}
</TreeViewRootProvider>
