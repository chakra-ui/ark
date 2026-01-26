import type { JsonNode } from '@zag-js/json-tree-utils'
import { type JSX, createMemo, splitProps } from 'solid-js'
import { TreeView } from '../tree-view'
import { JsonTreeViewPropsProvider } from './json-tree-view-props-context'
import type { UseJsonTreeViewReturn } from './use-json-tree-view'

export interface JsonTreeViewRootProviderProps extends Omit<TreeView.RootProviderProps<JsonNode>, 'value'> {
  value: UseJsonTreeViewReturn
}

export const JsonTreeViewRootProvider = (props: JsonTreeViewRootProviderProps): JSX.Element => {
  const [localProps, restProps] = splitProps(props, ['value'])

  const treeView = createMemo(() => {
    const { options: _, ...rest } = localProps.value()
    return rest
  })

  return (
    <JsonTreeViewPropsProvider value={localProps.value().options}>
      <TreeView.RootProvider data-scope="json-tree-view" value={treeView} {...restProps} />
    </JsonTreeViewPropsProvider>
  )
}
