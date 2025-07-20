<script lang="ts">
  import {
    type JsonNode,
    type JsonNodeHastElement,
    getAccessibleDescription,
    jsonNodeToElement,
    keyPathToKey,
  } from '@zag-js/json-tree-utils'
  import type { Snippet } from 'svelte'
  import { TreeView, useTreeViewContext } from '../tree-view'
  import JsonTreeViewKeyNode from './json-tree-view-key-node.svelte'
  import JsonTreeViewNode from './json-tree-view-node.svelte'
  import { useJsonTreeViewPropsContext } from './json-tree-view-props-context'
  import JsonTreeViewValueNode from './json-tree-view-value-node.svelte'

  export interface JsonTreeViewNodeBaseProps {
    /**
     * The icon to use for the arrow.
     */
    arrow?: Snippet<[]>
    /**
     * The indent guide to use for the tree.
     */
    indentGuide?: boolean | Snippet<[]>
    /**
     * The function to render the value of the node.
     */
    renderValue?: Snippet<[JsonNodeHastElement]>
  }

  export interface JsonTreeViewNodeProps extends JsonTreeViewNodeBaseProps {
    node: JsonNode
    indexPath: number[]
  }

  const props: JsonTreeViewNodeProps = $props()

  const { node, indexPath, arrow, indentGuide, renderValue } = props

  const options = useJsonTreeViewPropsContext()

  const tree = useTreeViewContext()
  const nodeState = $derived(tree().getNodeState({ node, indexPath }))

  const key = $derived(keyPathToKey(node.keyPath, { excludeRoot: true }))
  const valueNode = $derived(jsonNodeToElement(node, options()))

  const nodeProps = $derived.by(() => {
    const desc = getAccessibleDescription(node)
    const line = indexPath.reduce((acc, curr) => acc + curr, 1)
    const lineLength = indexPath.length - 1

    return {
      'aria-label': desc,
      'data-line': line,
      style: `--line-length: ${lineLength}`,
    }
  })

  const scopeProps = {
    'data-scope': 'json-tree-view',
  }
</script>

<TreeView.NodeProvider {node} {indexPath}>
  {#if nodeState.isBranch}
    <TreeView.Branch {...scopeProps}>
      <TreeView.BranchControl {...nodeProps} {...scopeProps}>
        {#if arrow}
          <TreeView.BranchIndicator {...scopeProps}>
            {@render arrow()}
          </TreeView.BranchIndicator>
        {/if}
        <TreeView.BranchText {...scopeProps}>
          {#if key}
            <JsonTreeViewKeyNode {node} showQuotes={options().quotesOnKeys} />
          {/if}
          <JsonTreeViewValueNode node={valueNode} {renderValue} />
        </TreeView.BranchText>
      </TreeView.BranchControl>
      <TreeView.BranchContent {...scopeProps}>
        {#if typeof indentGuide === 'boolean'}
          <TreeView.BranchIndentGuide />
        {:else if indentGuide}
          {@render indentGuide()}
        {/if}
        {#each node.children ?? [] as child, index (index)}
          <JsonTreeViewNode {...props} node={child} indexPath={[...indexPath, index]} />
        {/each}
      </TreeView.BranchContent>
    </TreeView.Branch>
  {:else}
    <TreeView.Item {...nodeProps} {...scopeProps}>
      <TreeView.ItemText {...scopeProps}>
        {#if key}
          <JsonTreeViewKeyNode {node} showQuotes={options().quotesOnKeys} />
        {/if}
        <JsonTreeViewValueNode node={valueNode} {renderValue} />
      </TreeView.ItemText>
    </TreeView.Item>
  {/if}
</TreeView.NodeProvider>
