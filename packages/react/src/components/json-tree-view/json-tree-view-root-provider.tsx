import type { JsonNode } from '../../../../json-tree-utils'
import { TreeView } from '../tree-view'

export interface JsonTreeViewRootProviderProps extends TreeView.RootProviderProps<JsonNode> {}

export const JsonTreeViewRootProvider = (props: JsonTreeViewRootProviderProps) => {
  return <TreeView.RootProvider {...props} />
}
