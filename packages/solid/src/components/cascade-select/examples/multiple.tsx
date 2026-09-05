import { CascadeSelect, createCascadeCollection, useCascadeSelectContext } from '@ark-ui/solid/cascade-select'
import { ChevronRightIcon, ChevronsUpDownIcon, XIcon } from 'lucide-solid'
import { For, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/cascade-select.module.css'

export const Multiple = () => (
  <CascadeSelect.Root class={styles.Root} collection={collection} multiple>
    <CascadeSelect.Label class={styles.Label}>Locations</CascadeSelect.Label>
    <CascadeSelect.Control class={styles.Control}>
      <CascadeSelect.Trigger class={styles.Trigger}>
        <CascadeSelect.ValueText class={styles.ValueText} placeholder="Select locations" />
        <CascadeSelect.Indicator class={styles.Indicator}>
          <ChevronsUpDownIcon />
        </CascadeSelect.Indicator>
      </CascadeSelect.Trigger>
      <CascadeSelect.ClearTrigger class={styles.ClearTrigger}>
        <XIcon />
      </CascadeSelect.ClearTrigger>
    </CascadeSelect.Control>
    <Portal>
      <CascadeSelect.Positioner>
        <CascadeSelect.Content class={styles.Content}>
          <TreeNode node={collection.rootNode} />
        </CascadeSelect.Content>
      </CascadeSelect.Positioner>
    </Portal>
    <CascadeSelect.HiddenInput />
  </CascadeSelect.Root>
)

const TreeNode = (props: { node: Node; indexPath?: number[]; value?: string[] }) => {
  const context = useCascadeSelectContext()
  const nodeState = () =>
    context().getItemState({ item: props.node, indexPath: props.indexPath ?? [], value: props.value ?? [] })
  return (
    <>
      <CascadeSelect.List
        class={styles.List}
        item={props.node}
        indexPath={props.indexPath ?? []}
        value={props.value ?? []}
      >
        <For each={collection.getNodeChildren(props.node)}>
          {(child, getIndex) => (
            <CascadeSelect.Item
              class={styles.Item}
              item={child}
              indexPath={[...(props.indexPath ?? []), getIndex()]}
              value={[...(props.value ?? []), collection.getNodeValue(child)]}
            >
              <CascadeSelect.ItemText class={styles.ItemText}>{collection.stringifyNode(child)}</CascadeSelect.ItemText>
              <Show
                when={collection.isBranchNode(child)}
                fallback={<CascadeSelect.ItemIndicator class={styles.ItemIndicator}>✓</CascadeSelect.ItemIndicator>}
              >
                <ChevronRightIcon class={styles.BranchIndicator} />
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
        ],
      },
    ],
  },
})
