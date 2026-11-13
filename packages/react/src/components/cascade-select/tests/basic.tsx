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

const TreeNode = ({ node, indexPath = [], value = [] }: { node: Node; indexPath?: number[]; value?: string[] }) => {
  const api = useCascadeSelectContext()
  const nodeState = api.getItemState({ item: node, indexPath, value })
  return (
    <>
      <CascadeSelect.List item={node} indexPath={indexPath} value={value}>
        {collection.getNodeChildren(node).map((child, i) => (
          <CascadeSelect.Item
            key={collection.getNodeValue(child)}
            item={child}
            indexPath={[...indexPath, i]}
            value={[...value, collection.getNodeValue(child)]}
          >
            <CascadeSelect.ItemText>{collection.stringifyNode(child)}</CascadeSelect.ItemText>
            {!collection.isBranchNode(child) && <CascadeSelect.ItemIndicator>✓</CascadeSelect.ItemIndicator>}
          </CascadeSelect.Item>
        ))}
      </CascadeSelect.List>
      {nodeState.highlightedChild && collection.isBranchNode(nodeState.highlightedChild) && (
        <TreeNode
          node={nodeState.highlightedChild as Node}
          indexPath={[...indexPath, nodeState.highlightedIndex]}
          value={[...value, collection.getNodeValue(nodeState.highlightedChild)]}
        />
      )}
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
  </CascadeSelect.Root>
)
