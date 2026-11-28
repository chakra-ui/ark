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

  let value = $state<string[][]>([])

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
</script>

<CascadeSelect.Root
  class={styles.Root}
  {collection}
  {value}
  onValueChange={(details) => {
    value = details.value
  }}
>
  <CascadeSelect.Label class={styles.Label}>Location</CascadeSelect.Label>
  <CascadeSelect.Control class={styles.Control}>
    <CascadeSelect.Trigger class={styles.Trigger}>
      <CascadeSelect.ValueText class={styles.ValueText} placeholder="Select a location" />
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

{#snippet renderNode(api: UseCascadeSelectReturn, node: Node, indexPath: number[], nodeValue: string[])}
  {@const nodeState = api().getItemState({ item: node, indexPath, value: nodeValue })}
  <CascadeSelect.List class={styles.List} item={node} {indexPath} value={nodeValue}>
    {#each collection.getNodeChildren(node) as child, i}
      <CascadeSelect.Item
        class={styles.Item}
        item={child}
        indexPath={[...indexPath, i]}
        value={[...nodeValue, collection.getNodeValue(child)]}
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
      [...nodeValue, collection.getNodeValue(nodeState.highlightedChild as Node)],
    )}
  {/if}
{/snippet}
