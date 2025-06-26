import {
  type JsonNode,
  type JsonNodeElement,
  errorStackToElement,
  getAccessibleDescription,
  jsonNodeToElement,
} from '../../../../json-tree-utils'
import { TreeView } from '../tree-view'

interface ValueNodeProps {
  node: JsonNodeElement
}

const ValueNode = (props: ValueNodeProps): React.ReactNode => {
  const { node } = props
  return (
    <span data-type={node.props.nodeType} data-kind={node.props.kind}>
      {Array.isArray(node.props.children)
        ? node.props.children.map((child, index) => (
            <span key={index} data-type={child.props.nodeType} data-kind={child.props.kind}>
              <ValueNode node={child} />
            </span>
          ))
        : node.props.children}
    </span>
  )
}

export interface JsonTreeNodeProps {
  node: JsonNode
  indexPath: number[]
  arrowIcon?: React.ReactElement
}

export function JsonTreeNode(props: JsonTreeNodeProps) {
  const { node, indexPath, arrowIcon } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children && node.children.length > 0 ? (
        <TreeView.Branch>
          <TreeView.BranchControl aria-label={getAccessibleDescription(node)}>
            {arrowIcon && <TreeView.BranchIndicator>{arrowIcon}</TreeView.BranchIndicator>}
            <TreeView.BranchText>
              {node.key && (
                <>
                  <span data-kind="key" data-non-enumerable={node.isNonEnumerable ? '' : undefined}>
                    {node.key}
                  </span>
                  <span data-kind="colon">: </span>
                </>
              )}
              <ValueNode node={jsonNodeToElement(node)} />
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            {/* <TreeView.BranchIndentGuide /> */}
            {node.children.map((child, index) => (
              <JsonTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} arrowIcon={arrowIcon} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item
          aria-label={getAccessibleDescription(node)}
          onClick={() => {
            console.log(node)
          }}
        >
          <TreeView.ItemText>
            {node.key && (
              <>
                <span data-kind="key" data-non-enumerable={node.isNonEnumerable ? '' : undefined}>
                  {node.key}
                </span>
                <span data-kind="colon">: </span>
              </>
            )}
            {node.key === 'stack' && typeof node.value === 'string' ? (
              <ValueNode node={errorStackToElement(node.value)} />
            ) : (
              <ValueNode node={jsonNodeToElement(node)} />
            )}
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}
