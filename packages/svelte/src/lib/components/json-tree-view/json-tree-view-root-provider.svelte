<script lang="ts">
  import type { JsonNode } from '@zag-js/json-tree-utils'
  import { TreeViewRootProvider, type TreeViewRootProviderProps } from '../tree-view'
  import { JsonTreeViewPropsProvider } from './json-tree-view-props-context'
  import type { UseJsonTreeViewReturn } from './use-json-tree-view.svelte'

  export interface JsonTreeViewRootProviderProps extends TreeViewRootProviderProps<JsonNode> {}

  const { value, ...props }: JsonTreeViewRootProviderProps = $props()

  const jsonTreeView = value as unknown as UseJsonTreeViewReturn

  const treeView = $derived(() => {
    const { options: _, ...rest } = jsonTreeView()
    return rest
  })

  JsonTreeViewPropsProvider(() => jsonTreeView().options)
</script>

<TreeViewRootProvider data-scope="json-tree-view" value={treeView} {...props}>
  {@render props.children?.()}
</TreeViewRootProvider>
