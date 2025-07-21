import type { JsonNode } from '@zag-js/json-tree-utils'
import type { JSX } from 'solid-js'
import { TreeView } from '../tree-view'

export interface JsonTreeViewRootProviderProps extends TreeView.RootProviderProps<JsonNode> {}

export const JsonTreeViewRootProvider = (props: JsonTreeViewRootProviderProps): JSX.Element => {
  return <TreeView.RootProvider data-scope="json-tree-view" {...props} />
}
