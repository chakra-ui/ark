import { Field } from '../../field'
import { CascadeSelect, createCascadeCollection } from '../'

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

const TreeNode = (props: { node: Node; indexPath?: number[]; value?: string[] }) => {
  return (
    <CascadeSelect.List item={props.node} indexPath={props.indexPath ?? []} value={props.value ?? []}>
      {collection.getNodeChildren(props.node).map((child, i) => (
        <CascadeSelect.Item
          item={child}
          indexPath={[...(props.indexPath ?? []), i]}
          value={[...(props.value ?? []), collection.getNodeValue(child)]}
        >
          <CascadeSelect.ItemText>{collection.stringifyNode(child)}</CascadeSelect.ItemText>
        </CascadeSelect.Item>
      ))}
    </CascadeSelect.List>
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
