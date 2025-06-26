import { useMemo } from 'react'
import { type JsonNode, getRootNode, nodeToString, nodeToValue } from '../../../../json-tree-utils'
import { TreeView, createTreeCollection } from '../tree-view'
import { JsonTreeNode } from './json-node'

export interface JsonViewProps extends Omit<TreeView.RootProps<JsonNode>, 'collection'> {
  data: unknown
  arrowIcon?: React.ReactElement
}

export const JsonTreeView = (props: JsonViewProps) => {
  const { data, arrowIcon, ...restProps } = props

  const collection = useMemo(() => {
    return createTreeCollection<JsonNode>({
      nodeToValue,
      nodeToString,
      rootNode: getRootNode(data),
    })
  }, [data])

  return (
    <TreeView.Root typeahead={false} collection={collection} {...restProps}>
      <TreeView.Tree>
        {collection.rootNode.children?.map((child, index) => (
          <JsonTreeNode key={child.id} node={child} indexPath={[index]} arrowIcon={arrowIcon} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  )
}
