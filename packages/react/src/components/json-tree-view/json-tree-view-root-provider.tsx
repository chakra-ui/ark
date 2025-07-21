import type { JsonNode } from '@zag-js/json-tree-utils'
import { forwardRef } from 'react'
import { TreeView } from '../tree-view'

export interface JsonTreeViewRootProviderProps extends TreeView.RootProviderProps<JsonNode> {}

export const JsonTreeViewRootProvider = forwardRef<HTMLDivElement, JsonTreeViewRootProviderProps>((props, ref) => {
  return <TreeView.RootProvider data-scope="json-tree-view" {...props} ref={ref} />
})

JsonTreeViewRootProvider.displayName = 'JsonTreeViewRootProvider'
