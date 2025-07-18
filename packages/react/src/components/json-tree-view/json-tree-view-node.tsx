import { type JsonNode, getAccessibleDescription, jsonNodeToElement } from '@zag-js/json-tree-utils'
import { TreeView } from '../tree-view'
import { JsonTreeViewKeyNode } from './json-tree-view-key-node'
import { JsonTreeViewValueNode } from './json-tree-view-value-node'

export interface JsonTreeViewNodeBaseProps {
  arrowIcon?: React.ReactElement
  showIndentGuide?: boolean
}

export interface JsonTreeViewNodeProps extends JsonTreeViewNodeBaseProps {
  node: JsonNode
  indexPath: number[]
}

const scopeProps = {
  'data-scope': 'json-tree-view',
}

export function JsonTreeViewNode(props: JsonTreeViewNodeProps) {
  const { node, indexPath, arrowIcon, showIndentGuide } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children && node.children.length > 0 ? (
        <TreeView.Branch {...scopeProps}>
          <TreeView.BranchControl {...scopeProps} aria-label={getAccessibleDescription(node)}>
            {arrowIcon && <TreeView.BranchIndicator {...scopeProps}>{arrowIcon}</TreeView.BranchIndicator>}
            <TreeView.BranchText {...scopeProps}>
              {node.key && <JsonTreeViewKeyNode node={node} />}
              <JsonTreeViewValueNode node={jsonNodeToElement(node)} />
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent {...scopeProps}>
            {showIndentGuide && <TreeView.BranchIndentGuide />}
            {node.children.map((child, index) => (
              <JsonTreeViewNode
                key={child.id}
                node={child}
                indexPath={[...indexPath, index]}
                arrowIcon={arrowIcon}
                showIndentGuide={showIndentGuide}
              />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item {...scopeProps} aria-label={getAccessibleDescription(node)}>
          <TreeView.ItemText {...scopeProps}>
            {node.key && <JsonTreeViewKeyNode node={node} />}
            <JsonTreeViewValueNode node={jsonNodeToElement(node)} />
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}
