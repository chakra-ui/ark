<script lang="ts">
  import {
    CascadeSelect,
    createCascadeCollection,
    type CascadeSelectOpenChangeDetails,
    type CascadeSelectValueChangeDetails,
    type UseCascadeSelectReturn,
  } from '../'

  interface Node {
    label: string
    value: string
    children?: Node[]
  }

  interface Props {
    disabled?: boolean
    readOnly?: boolean
    lazyMount?: boolean
    unmountOnExit?: boolean
    onValueChange?: (details: CascadeSelectValueChangeDetails) => void
    onOpenChange?: (details: CascadeSelectOpenChangeDetails) => void
  }

  let { disabled, readOnly, lazyMount, unmountOnExit, onValueChange, onOpenChange }: Props = $props()

  const collection = createCascadeCollection<Node>({
    nodeToValue: (node) => node.value,
    nodeToString: (node) => node.label,
    rootNode: {
      label: 'Root',
      value: 'root',
      children: [
        {
          label: 'Fruits',
          value: 'fruits',
          children: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
          ],
        },
        {
          label: 'Vegetables',
          value: 'vegetables',
          children: [
            { label: 'Carrot', value: 'carrot' },
            { label: 'Broccoli', value: 'broccoli' },
          ],
        },
      ],
    },
  })
</script>

<CascadeSelect.Root
  {collection}
  {disabled}
  {readOnly}
  {lazyMount}
  {unmountOnExit}
  {onValueChange}
  {onOpenChange}
>
  <CascadeSelect.Label>Category</CascadeSelect.Label>
  <CascadeSelect.Control>
    <CascadeSelect.Trigger>
      <CascadeSelect.ValueText placeholder="Select a category" />
      <CascadeSelect.Indicator>▼</CascadeSelect.Indicator>
    </CascadeSelect.Trigger>
    <CascadeSelect.ClearTrigger>Clear</CascadeSelect.ClearTrigger>
  </CascadeSelect.Control>
  <CascadeSelect.Positioner data-testid="positioner">
    <CascadeSelect.Content>
      <CascadeSelect.Context>
        {#snippet render(api)}
          {@render renderNode(api, collection.rootNode, [], [])}
        {/snippet}
      </CascadeSelect.Context>
    </CascadeSelect.Content>
  </CascadeSelect.Positioner>
</CascadeSelect.Root>

{#snippet renderNode(api: UseCascadeSelectReturn, node: Node, indexPath: number[], value: string[])}
  {@const nodeState = api().getItemState({ item: node, indexPath, value })}
  <CascadeSelect.List item={node} {indexPath} {value}>
    {#each collection.getNodeChildren(node) as child, i}
      <CascadeSelect.Item
        item={child}
        indexPath={[...indexPath, i]}
        value={[...value, collection.getNodeValue(child)]}
      >
        <CascadeSelect.ItemText>{collection.stringifyNode(child)}</CascadeSelect.ItemText>
        {#if !collection.isBranchNode(child)}
          <CascadeSelect.ItemIndicator>✓</CascadeSelect.ItemIndicator>
        {/if}
      </CascadeSelect.Item>
    {/each}
  </CascadeSelect.List>
  {#if nodeState.highlightedChild && collection.isBranchNode(nodeState.highlightedChild)}
    {@render renderNode(
      api,
      nodeState.highlightedChild as Node,
      [...indexPath, nodeState.highlightedIndex],
      [...value, collection.getNodeValue(nodeState.highlightedChild as Node)],
    )}
  {/if}
{/snippet}
