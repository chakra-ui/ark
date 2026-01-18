import type { JsonNode } from '@zag-js/json-tree-utils'
import { forwardRef } from 'react'
import { TreeView } from '../tree-view'
import { JsonTreeViewPropsProvider } from './json-tree-view-props-context'
import type { UseJsonTreeViewReturn } from './use-json-tree-view'

export interface JsonTreeViewRootProviderProps extends Omit<TreeView.RootProviderProps<JsonNode>, 'value'> {
  value: UseJsonTreeViewReturn
}

export const JsonTreeViewRootProvider = forwardRef<HTMLDivElement, JsonTreeViewRootProviderProps>((props, ref) => {
  const { value, ...restProps } = props
  const { options, ...treeView } = value

  return (
    <JsonTreeViewPropsProvider value={options}>
      <TreeView.RootProvider data-scope="json-tree-view" value={treeView} {...restProps} ref={ref} />
    </JsonTreeViewPropsProvider>
  )
})

JsonTreeViewRootProvider.displayName = 'JsonTreeViewRootProvider'
