import { type JsonNode, getAccessibleDescription, jsonNodeToElement } from '@zag-js/json-tree-utils'
import { TreeView } from '../tree-view'
import { JsonTreeViewKeyNode } from './json-tree-view-key-node'
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
   * Whether to show quotes on the keys.
   */
  quotesOnKeys?: boolean
}

export interface JsonTreeViewNodeProps extends JsonTreeViewNodeBaseProps {
  node: JsonNode
  indexPath: number[]
}

const scopeProps = {
  'data-scope': 'json-tree-view',
}

export function JsonTreeViewNode(props: JsonTreeViewNodeProps) {
  const { node, indexPath, arrow: arrowIcon, indentGuide, quotesOnKeys } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children && node.children.length > 0 ? (
        <TreeView.Branch {...scopeProps}>
          <TreeView.BranchControl {...scopeProps} aria-label={getAccessibleDescription(node)}>
            {arrowIcon && <TreeView.BranchIndicator {...scopeProps}>{arrowIcon}</TreeView.BranchIndicator>}
            <TreeView.BranchText {...scopeProps}>
              {node.key && <JsonTreeViewKeyNode node={node} showQuotes={quotesOnKeys} />}
              <JsonTreeViewValueNode node={jsonNodeToElement(node)} />
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent {...scopeProps}>
            {typeof indentGuide === 'boolean' ? <TreeView.BranchIndentGuide /> : indentGuide}
            {node.children.map((child, index) => (
              <JsonTreeViewNode
                key={child.id}
                node={child}
                indexPath={[...indexPath, index]}
                arrow={arrowIcon}
                indentGuide={indentGuide}
                quotesOnKeys={quotesOnKeys}
              />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item {...scopeProps} aria-label={getAccessibleDescription(node)}>
          <TreeView.ItemText {...scopeProps}>
            {node.key && <JsonTreeViewKeyNode node={node} showQuotes={quotesOnKeys} />}
            <JsonTreeViewValueNode node={jsonNodeToElement(node)} />
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}
