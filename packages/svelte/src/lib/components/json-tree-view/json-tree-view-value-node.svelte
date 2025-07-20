<script lang="ts">
  import type { JsonNodeHastElement } from '@zag-js/json-tree-utils'
  import JsonTreeViewValueNode from './json-tree-view-value-node.svelte'
  import type { Snippet } from 'svelte'

  interface JsonTreeViewValueNodeProps {
    node: JsonNodeHastElement
    renderValue?: Snippet<[JsonNodeHastElement]>
  }

  let { node, renderValue }: JsonTreeViewValueNodeProps = $props()
</script>

{#if node.type === 'text'}
  {#if renderValue}
    {@render renderValue(node)}
  {:else}
    {node.value}
  {/if}
{:else}
  <svelte:element
    this={node.tagName}
    data-root={node.properties.root ? '' : undefined}
    data-type={node.properties.nodeType}
    data-kind={node.properties.kind}
  >
    {#each node.children as child, index (index)}
      <JsonTreeViewValueNode node={child} {renderValue} />
    {/each}
  </svelte:element>
{/if}
