import { Field } from '../../field'
import { CascadeSelect, createCascadeCollection, useCascadeSelectContext } from '../'

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
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
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

export const CascadeSelectWithField = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <CascadeSelect.Root collection={collection}>
      <CascadeSelect.Label>Label</CascadeSelect.Label>
      <CascadeSelect.Control>
        <CascadeSelect.Trigger>
          <CascadeSelect.ValueText placeholder="Select" />
          <CascadeSelect.Indicator>▼</CascadeSelect.Indicator>
        </CascadeSelect.Trigger>
      </CascadeSelect.Control>
      <CascadeSelect.Positioner>
        <CascadeSelect.Content>
          <TreeNode node={collection.rootNode} />
        </CascadeSelect.Content>
      </CascadeSelect.Positioner>
      <CascadeSelect.HiddenInput />
    </CascadeSelect.Root>
    <Field.HelperText>Additional Info</Field.HelperText>
    <Field.ErrorText>Error Info</Field.ErrorText>
  </Field.Root>
)
