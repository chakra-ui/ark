import {
  type JsonNode,
  type JsonNodeHastElement,
  getAccessibleDescription,
  jsonNodeToElement,
  keyPathToKey,
} from '@zag-js/json-tree-utils'
import { type JSX, createMemo } from 'solid-js'
import { Index, Show } from 'solid-js/web'
import { TreeView, useTreeViewContext } from '../tree-view'
import { JsonTreeViewKeyNode } from './json-tree-view-key-node'
import { useJsonTreeViewPropsContext } from './json-tree-view-props-context'
import { JsonTreeViewValueNode } from './json-tree-view-value-node'

export interface JsonTreeViewNodeBaseProps {
  /**
   * The icon to use for the arrow.
   */
  arrow?: JSX.Element
  /**
   * The indent guide to use for the tree.
   */
  indentGuide?: boolean | JSX.Element
  /**
   * The function to render the value of the node.
   */
  renderValue?: (node: JsonNodeHastElement) => JSX.Element
}

export interface JsonTreeViewNodeProps extends JsonTreeViewNodeBaseProps {
  node: JsonNode
  indexPath: number[]
}

const scopeProps = {
  'data-scope': 'json-tree-view',
}

export function JsonTreeViewNode(props: JsonTreeViewNodeProps): JSX.Element {
  const tree = useTreeViewContext()
  const nodeState = createMemo(() => tree().getNodeState({ node: props.node, indexPath: props.indexPath }))

  const options = useJsonTreeViewPropsContext()

  const key = createMemo(() => keyPathToKey(props.node.keyPath, { excludeRoot: true }))
  const valueNode = createMemo(() => jsonNodeToElement(props.node, options))

  const nodeProps = createMemo(() => {
    const desc = getAccessibleDescription(props.node)

    const line = props.indexPath.reduce((acc, curr) => acc + curr, 1)
    const lineLength = props.indexPath.length - 1

    return {
      ...scopeProps,
      'aria-label': desc,
      'data-line': line,
      style: { ['--line-length' as any]: lineLength },
    }
  })

  return (
    <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
      <Show
        when={nodeState().isBranch}
        fallback={
          <TreeView.Item {...nodeProps()}>
            <TreeView.ItemText {...scopeProps}>
              <Show when={key()}>
                <JsonTreeViewKeyNode node={props.node} showQuotes={options.quotesOnKeys} />
              </Show>
              <JsonTreeViewValueNode node={valueNode()} renderValue={props.renderValue} />
            </TreeView.ItemText>
          </TreeView.Item>
        }
      >
        <TreeView.Branch {...scopeProps}>
          <TreeView.BranchControl {...nodeProps()}>
            <Show when={props.arrow}>
              <TreeView.BranchIndicator {...scopeProps}>{props.arrow}</TreeView.BranchIndicator>
            </Show>
            <TreeView.BranchText {...scopeProps}>
              <Show when={key()}>
                <JsonTreeViewKeyNode node={props.node} showQuotes={options.quotesOnKeys} />
              </Show>
              <JsonTreeViewValueNode node={valueNode()} renderValue={props.renderValue} />
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent {...scopeProps}>
            <Show when={typeof props.indentGuide === 'boolean'} fallback={props.indentGuide}>
              <TreeView.BranchIndentGuide />
            </Show>
            <Index each={props.node.children}>
              {(child, index) => <JsonTreeViewNode {...props} node={child()} indexPath={[...props.indexPath, index]} />}
            </Index>
          </TreeView.BranchContent>
        </TreeView.Branch>
      </Show>
    </TreeView.NodeProvider>
  )
}
