<script lang="ts">
  import type { JsonNode } from '@zag-js/json-tree-utils'
  import { TreeViewRootProvider, type TreeViewRootProviderProps } from '../tree-view'

  export interface JsonTreeViewRootProviderProps extends TreeViewRootProviderProps<JsonNode> {}

  const props: JsonTreeViewRootProviderProps = $props()
</script>

<TreeViewRootProvider data-scope="json-tree-view" {...props}>
  {@render props.children?.()}
</TreeViewRootProvider>
