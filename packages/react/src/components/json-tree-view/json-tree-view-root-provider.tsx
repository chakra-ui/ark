import type { JsonNode } from '@zag-js/json-tree-utils'
import { TreeView } from '../tree-view'

export interface JsonTreeViewRootProviderProps extends TreeView.RootProviderProps<JsonNode> {}

export const JsonTreeViewRootProvider = (props: JsonTreeViewRootProviderProps) => {
  return <TreeView.RootProvider data-scope="json-tree-view" {...props} />
}
