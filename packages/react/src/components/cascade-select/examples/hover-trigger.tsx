import { Portal } from '@ark-ui/react/portal'
import { CascadeSelect, createCascadeCollection, useCascadeSelectContext } from '@ark-ui/react/cascade-select'
import { ChevronRightIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import styles from 'styles/cascade-select.module.css'

export const HoverTrigger = () => (
  <CascadeSelect.Root className={styles.Root} collection={collection} highlightTrigger="hover">
    <CascadeSelect.Label className={styles.Label}>Location</CascadeSelect.Label>
    <CascadeSelect.Control className={styles.Control}>
      <CascadeSelect.Trigger className={styles.Trigger}>
        <CascadeSelect.ValueText className={styles.ValueText} placeholder="Select a location" />
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
        label: 'Americas',
        value: 'americas',
        children: [
          {
            label: 'United States',
            value: 'us',
            children: [
              { label: 'New York', value: 'new-york' },
              { label: 'California', value: 'california' },
            ],
          },
          {
            label: 'Canada',
            value: 'canada',
            children: [
              { label: 'Ontario', value: 'ontario' },
              { label: 'Quebec', value: 'quebec' },
            ],
          },
        ],
      },
      {
        label: 'Europe',
        value: 'europe',
        children: [
          {
            label: 'France',
            value: 'france',
            children: [
              { label: 'Paris', value: 'paris' },
              { label: 'Lyon', value: 'lyon' },
            ],
          },
          {
            label: 'Germany',
            value: 'germany',
            children: [
              { label: 'Berlin', value: 'berlin' },
              { label: 'Munich', value: 'munich' },
            ],
          },
        ],
      },
    ],
  },
})
