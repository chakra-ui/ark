<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { CascadeSelect, createCascadeCollection, useCascadeSelect } from '@ark-ui/svelte/cascade-select'
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

  const id = $props.id()
  const cascadeSelect = useCascadeSelect({ collection, id })
</script>

<output>value: {JSON.stringify(cascadeSelect().value)}</output>

<CascadeSelect.RootProvider class={styles.Root} value={cascadeSelect}>
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
        {@render renderNode(cascadeSelect, collection.rootNode, [], [])}
      </CascadeSelect.Content>
    </CascadeSelect.Positioner>
  </Portal>
  <CascadeSelect.HiddenInput />
</CascadeSelect.RootProvider>

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
