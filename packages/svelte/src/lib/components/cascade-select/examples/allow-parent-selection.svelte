<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { CascadeSelect, createCascadeCollection } from '@ark-ui/svelte/cascade-select'
  import type { UseCascadeSelectReturn } from '@ark-ui/svelte/cascade-select'
  import { ChevronRightIcon, ChevronsUpDownIcon, XIcon } from 'lucide-svelte'
  import styles from 'styles/cascade-select.module.css'

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
</script>

<CascadeSelect.Root class={styles.Root} {collection} allowParentSelection>
  <CascadeSelect.Label class={styles.Label}>Category</CascadeSelect.Label>
  <CascadeSelect.Control class={styles.Control}>
    <CascadeSelect.Trigger class={styles.Trigger}>
      <CascadeSelect.ValueText class={styles.ValueText} placeholder="Select a category" />
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
        <CascadeSelect.Context>
          {#snippet render(api)}
            {@render renderNode(api, collection.rootNode, [], [])}
          {/snippet}
        </CascadeSelect.Context>
      </CascadeSelect.Content>
    </CascadeSelect.Positioner>
  </Portal>
  <CascadeSelect.HiddenInput />
</CascadeSelect.Root>

{#snippet renderNode(api: UseCascadeSelectReturn, node: Node, indexPath: number[], value: string[])}
  {@const nodeState = api().getItemState({ item: node, indexPath, value })}
  <CascadeSelect.List class={styles.List} item={node} {indexPath} {value}>
    {#each collection.getNodeChildren(node) as child, i}
      <CascadeSelect.Item
        class={styles.Item}
        item={child}
        indexPath={[...indexPath, i]}
        value={[...value, collection.getNodeValue(child)]}
      >
        <CascadeSelect.ItemText class={styles.ItemText}>
          {collection.stringifyNode(child)}
        </CascadeSelect.ItemText>
        {#if collection.isBranchNode(child)}
          <ChevronRightIcon class={styles.BranchIndicator} />
        {:else}
          <CascadeSelect.ItemIndicator class={styles.ItemIndicator}>✓</CascadeSelect.ItemIndicator>
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
