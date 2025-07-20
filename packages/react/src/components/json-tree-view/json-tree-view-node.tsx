import {
  type JsonNode,
  type JsonNodeHastElement,
  getAccessibleDescription,
  jsonNodeToElement,
  keyPathToId,
  keyPathToKey,
} from '@zag-js/json-tree-utils'
import { useMemo } from 'react'
import { TreeView, useTreeViewContext } from '../tree-view'
import { JsonTreeViewKeyNode } from './json-tree-view-key-node'
import { useJsonTreeViewPropsContext } from './json-tree-view-props-context'
import { JsonTreeViewValueNode } from './json-tree-view-value-node'

export interface JsonTreeViewNodeBaseProps {
  /**
   * The icon to use for the arrow.
   */
  arrow?: React.ReactElement
  /**
   * The indent guide to use for the tree.
   */
  indentGuide?: boolean | React.ReactElement
  /**
   * The function to render the value of the node.
   */
  renderValue?: (node: JsonNodeHastElement) => React.ReactNode
}

export interface JsonTreeViewNodeProps extends JsonTreeViewNodeBaseProps {
  node: JsonNode
  indexPath: number[]
}

const scopeProps = {
  'data-scope': 'json-tree-view',
}

export function JsonTreeViewNode(props: JsonTreeViewNodeProps) {
  const { node, indexPath, arrow, indentGuide, renderValue } = props

  const tree = useTreeViewContext()
  const nodeState = tree.getNodeState({ node, indexPath })

  const options = useJsonTreeViewPropsContext()

  const valueNode = useMemo(() => jsonNodeToElement(node, options), [node, options])

  const key = keyPathToKey(node.keyPath, { excludeRoot: true })
  const id = keyPathToId(node.keyPath)

  const nodeProps: Record<string, any> = useMemo(() => {
    const desc = getAccessibleDescription(node)

    const line = indexPath.reduce((acc, curr) => acc + curr, 1)
    const lineLength = indexPath.length - 1

    return {
      ...scopeProps,
      'aria-label': desc,
      'data-line': line,
      style: { ['--line-length' as any]: lineLength },
    }
  }, [indexPath, node])

  return (
    <TreeView.NodeProvider key={id} node={node} indexPath={indexPath}>
      {nodeState.isBranch ? (
        <TreeView.Branch {...scopeProps}>
          <TreeView.BranchControl {...nodeProps}>
            {arrow && <TreeView.BranchIndicator {...scopeProps}>{arrow}</TreeView.BranchIndicator>}
            <TreeView.BranchText {...scopeProps}>
              {key && <JsonTreeViewKeyNode node={node} showQuotes={options.quotesOnKeys} />}
              <JsonTreeViewValueNode node={valueNode} renderValue={renderValue} />
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent {...scopeProps}>
            {typeof indentGuide === 'boolean' ? <TreeView.BranchIndentGuide /> : indentGuide}
            {node.children?.map((child, index) => (
              <JsonTreeViewNode key={index} {...props} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item {...nodeProps}>
          <TreeView.ItemText {...scopeProps}>
            {key && <JsonTreeViewKeyNode node={node} showQuotes={options.quotesOnKeys} />}
            <JsonTreeViewValueNode node={valueNode} renderValue={renderValue} />
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}
