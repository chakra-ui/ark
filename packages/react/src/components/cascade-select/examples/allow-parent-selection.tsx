import { Portal } from '@ark-ui/react/portal'
import { CascadeSelect, createCascadeCollection, useCascadeSelectContext } from '@ark-ui/react/cascade-select'
import { ChevronRightIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import styles from 'styles/cascade-select.module.css'

export const AllowParentSelection = () => (
  <CascadeSelect.Root className={styles.Root} collection={collection} allowParentSelection>
    <CascadeSelect.Label className={styles.Label}>Category</CascadeSelect.Label>
    <CascadeSelect.Control className={styles.Control}>
      <CascadeSelect.Trigger className={styles.Trigger}>
        <CascadeSelect.ValueText className={styles.ValueText} placeholder="Select a category" />
        <CascadeSelect.Indicator className={styles.Indicator}>
          <ChevronsUpDownIcon />
        </CascadeSelect.Indicator>
      </CascadeSelect.Trigger>
      <CascadeSelect.ClearTrigger className={styles.ClearTrigger}>
        <XIcon />
      </CascadeSelect.ClearTrigger>
    </CascadeSelect.Control>
    <Portal>
      <CascadeSelect.Positioner>
        <CascadeSelect.Content className={styles.Content}>
          <TreeNode node={collection.rootNode} />
        </CascadeSelect.Content>
      </CascadeSelect.Positioner>
    </Portal>
    <CascadeSelect.HiddenInput />
  </CascadeSelect.Root>
)

const TreeNode = ({ node, indexPath = [], value = [] }: { node: Node; indexPath?: number[]; value?: string[] }) => {
  const api = useCascadeSelectContext()
  const nodeState = api.getItemState({ item: node, indexPath, value })
  return (
    <>
      <CascadeSelect.List className={styles.List} item={node} indexPath={indexPath} value={value}>
        {collection.getNodeChildren(node).map((child, i) => (
          <CascadeSelect.Item
            className={styles.Item}
            key={collection.getNodeValue(child)}
            item={child}
            indexPath={[...indexPath, i]}
            value={[...value, collection.getNodeValue(child)]}
          >
            <CascadeSelect.ItemText className={styles.ItemText}>
              {collection.stringifyNode(child)}
            </CascadeSelect.ItemText>
            {collection.isBranchNode(child) ? (
              <ChevronRightIcon className={styles.BranchIndicator} />
            ) : (
              <CascadeSelect.ItemIndicator className={styles.ItemIndicator}>✓</CascadeSelect.ItemIndicator>
            )}
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
        label: 'Electronics',
        value: 'electronics',
        children: [
          {
            label: 'Phones',
            value: 'phones',
            children: [
              { label: 'Android', value: 'android' },
              { label: 'iPhone', value: 'iphone' },
            ],
          },
          {
            label: 'Laptops',
            value: 'laptops',
            children: [
              { label: 'Gaming', value: 'gaming-laptop' },
              { label: 'Ultrabook', value: 'ultrabook' },
            ],
          },
        ],
      },
      {
        label: 'Clothing',
        value: 'clothing',
        children: [
          { label: 'Shirts', value: 'shirts' },
          { label: 'Pants', value: 'pants' },
        ],
      },
    ],
  },
})
