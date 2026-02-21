<script lang="ts">
  import { Field } from '../../field'
  import { CascadeSelect, createCascadeCollection, type UseCascadeSelectReturn } from '../'

  interface Node {
    label: string
    value: string
    children?: Node[]
  }

  interface Props {
    disabled?: boolean
    readOnly?: boolean
    invalid?: boolean
  }

  let { disabled, readOnly, invalid }: Props = $props()

  const collection = createCascadeCollection<Node>({
    nodeToValue: (node) => node.value,
    nodeToString: (node) => node.label,
    rootNode: {
      label: 'Root',
      value: 'root',
      children: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ],
    },
  })
</script>

<Field.Root {disabled} {readOnly} {invalid}>
  <CascadeSelect.Root {collection}>
    <CascadeSelect.Label>Label</CascadeSelect.Label>
    <CascadeSelect.Control>
      <CascadeSelect.Trigger>
        <CascadeSelect.ValueText placeholder="Select" />
        <CascadeSelect.Indicator>▼</CascadeSelect.Indicator>
      </CascadeSelect.Trigger>
    </CascadeSelect.Control>
    <CascadeSelect.Positioner>
      <CascadeSelect.Content>
        <CascadeSelect.Context>
          {#snippet render(api)}
            {@render renderNode(api, collection.rootNode, [], [])}
          {/snippet}
        </CascadeSelect.Context>
      </CascadeSelect.Content>
    </CascadeSelect.Positioner>
    <CascadeSelect.HiddenInput />
  </CascadeSelect.Root>
  <Field.HelperText>Additional Info</Field.HelperText>
  <Field.ErrorText>Error Info</Field.ErrorText>
</Field.Root>

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
