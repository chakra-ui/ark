'use client'

import {
  type JsonNode,
  type JsonNodeHastElement,
  getAccessibleDescription,
  jsonNodeToElement,
  keyPathToKey,
} from '@zag-js/json-tree-utils'
import { useMemo } from 'react'
import { TreeView, useTreeViewContext } from '../tree-view/index.ts'
import { JsonTreeViewKeyNode } from './json-tree-view-key-node.tsx'
import { useJsonTreeViewPropsContext } from './json-tree-view-props-context.ts'
import { JsonTreeViewValueNode } from './json-tree-view-value-node.tsx'

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

  const options = useJsonTreeViewPropsContext()
  const tree = useTreeViewContext()

  const nodeState = tree.getNodeState({ node, indexPath })
  const key = keyPathToKey(node.keyPath, { excludeRoot: true })
  const valueNode = useMemo(() => jsonNodeToElement(node, options), [node, options])

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
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      {nodeState.isBranch ? (
        <TreeView.NodeGroup {...scopeProps}>
          <TreeView.Node {...nodeProps}>
            <TreeView.Cell {...scopeProps}>
              {arrow && (
                <TreeView.NodeIndicator type="expanded" {...scopeProps}>
                  {arrow}
                </TreeView.NodeIndicator>
              )}
              <TreeView.NodeText {...scopeProps}>
                {key && <JsonTreeViewKeyNode node={node} showQuotes={options.quotesOnKeys} />}
                <JsonTreeViewValueNode node={valueNode} renderValue={renderValue} />
              </TreeView.NodeText>
            </TreeView.Cell>
          </TreeView.Node>
          <TreeView.NodeGroupContent {...scopeProps}>
            {typeof indentGuide === 'boolean' ? <TreeView.IndentGuide /> : indentGuide}
            {node.children?.map((child, index) => (
              <JsonTreeViewNode key={index} {...props} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.NodeGroupContent>
        </TreeView.NodeGroup>
      ) : (
        <TreeView.Node {...nodeProps}>
          <TreeView.Cell {...scopeProps}>
            <TreeView.NodeText {...scopeProps}>
              {key && <JsonTreeViewKeyNode node={node} showQuotes={options.quotesOnKeys} />}
              <JsonTreeViewValueNode node={valueNode} renderValue={renderValue} />
            </TreeView.NodeText>
          </TreeView.Cell>
        </TreeView.Node>
      )}
    </TreeView.NodeProvider>
  )
}
