import { For, Show } from 'solid-js'
import { CascadeSelect, createCascadeCollection, useCascadeSelectContext } from '../'
import type { Optional } from '../../../types'

interface Node {
  label: string
  value: string
  children?: Node[]
}

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

const TreeNode = (props: { node: Node; indexPath?: number[]; value?: string[] }) => {
  const context = useCascadeSelectContext()
  const nodeState = () =>
    context().getItemState({ item: props.node, indexPath: props.indexPath ?? [], value: props.value ?? [] })
  return (
    <>
      <CascadeSelect.List item={props.node} indexPath={props.indexPath ?? []} value={props.value ?? []}>
        <For each={collection.getNodeChildren(props.node)}>
          {(child, getIndex) => (
            <CascadeSelect.Item
              item={child}
              indexPath={[...(props.indexPath ?? []), getIndex()]}
              value={[...(props.value ?? []), collection.getNodeValue(child)]}
            >
              <CascadeSelect.ItemText>{collection.stringifyNode(child)}</CascadeSelect.ItemText>
              <Show when={!collection.isBranchNode(child)}>
                <CascadeSelect.ItemIndicator>✓</CascadeSelect.ItemIndicator>
              </Show>
            </CascadeSelect.Item>
          )}
        </For>
      </CascadeSelect.List>
      <Show when={nodeState().highlightedChild && collection.isBranchNode(nodeState().highlightedChild as Node)}>
        <TreeNode
          node={nodeState().highlightedChild as Node}
          indexPath={[...(props.indexPath ?? []), nodeState().highlightedIndex]}
          value={[...(props.value ?? []), collection.getNodeValue(nodeState().highlightedChild as Node)]}
        />
      </Show>
    </>
  )
}

export const ComponentUnderTest = (props: Optional<CascadeSelect.RootProps<Node>, 'collection'>) => (
  <CascadeSelect.Root collection={collection} {...props}>
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
        <TreeNode node={collection.rootNode} />
      </CascadeSelect.Content>
    </CascadeSelect.Positioner>
    <CascadeSelect.HiddenInput />
  </CascadeSelect.Root>
)
