<script lang="ts">
  import type { JsonNode } from '@zag-js/json-tree-utils'
  import { TreeViewRootProvider, type TreeViewRootProviderProps } from '../tree-view/index.ts'
  import { JsonTreeViewPropsProvider } from './json-tree-view-props-context.ts'
  import type { UseJsonTreeViewReturn } from './use-json-tree-view.svelte.ts'

  export interface JsonTreeViewRootProviderProps extends Omit<TreeViewRootProviderProps<JsonNode>, 'value'> {
    value: UseJsonTreeViewReturn
  }

  let { value, ...props }: JsonTreeViewRootProviderProps = $props()

  const treeView = () => {
    const { options: _, ...rest } = value()
    return rest
  }

  JsonTreeViewPropsProvider(() => value().options)
</script>

<TreeViewRootProvider data-scope="json-tree-view" value={treeView} {...props} />
