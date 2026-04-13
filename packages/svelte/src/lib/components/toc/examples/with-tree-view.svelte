<script lang="ts">
  import { Toc } from '@ark-ui/svelte/toc'
  import { TreeView, createTreeCollection } from '@ark-ui/svelte/tree-view'
  import { loremIpsum } from 'lorem-ipsum'
  import { ChevronRightIcon } from 'lucide-svelte'
  import tocStyles from 'styles/toc.module.css'
  import treeStyles from 'styles/tree-view.module.css'

  const p = loremIpsum({ count: 5, units: 'paragraphs' })

  type TocNode = {
    id: string
    name: string
    depth: number
    children?: TocNode[]
  }

  const sections: TocNode[] = [
    {
      id: 'guides',
      name: 'Guides',
      depth: 2,
      children: [
        { id: 'quick-start', name: 'Quick Start', depth: 3 },
        { id: 'manual-setup', name: 'Manual Setup', depth: 3 },
      ],
    },
    {
      id: 'core-concepts',
      name: 'Core Concepts',
      depth: 2,
      children: [
        { id: 'props', name: 'Props', depth: 3 },
        { id: 'events', name: 'Events', depth: 3 },
        { id: 'context', name: 'Context', depth: 3 },
      ],
    },
    {
      id: 'advanced',
      name: 'Advanced',
      depth: 2,
      children: [
        { id: 'root-provider', name: 'Root Provider', depth: 3 },
        { id: 'custom-rendering', name: 'Custom Rendering', depth: 3 },
      ],
    },
  ]

  const collection = createTreeCollection<TocNode>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: { id: 'ROOT', name: '', depth: 0, children: sections },
  })

  const allItems = sections.flatMap((section) => [
    { value: section.id, depth: section.depth },
    ...(section.children ?? []).map((child) => ({ value: child.id, depth: child.depth })),
  ])

  let expandedValue = $state<string[]>([])
</script>

<div class={tocStyles.Root}>
  <article class={tocStyles.Content}>
    {#each sections as section (section.id)}
      <section>
        <h2 id={section.id}>{section.name}</h2>
        <p>{p}</p>
        {#each section.children ?? [] as child (child.id)}
          <div>
            <h3 id={child.id}>{child.name}</h3>
            <p>{p}</p>
          </div>
        {/each}
      </section>
    {/each}
  </article>
  <Toc.Nav
    class={tocStyles.Nav}
    items={allItems}
    onActiveChange={({ activeItems }) => {
      const activeIds = new Set(activeItems.map((i) => i.value))
      expandedValue = sections
        .filter(
          (section) =>
            activeIds.has(section.id) ||
            (section.children ?? []).some((child) => activeIds.has(child.id)),
        )
        .map((s) => s.id)
    }}
  >
    <Toc.Title class={tocStyles.Title}>On this page</Toc.Title>
    <TreeView.Root
      class={treeStyles.Root}
      {collection}
      {expandedValue}
      onExpandedChange={({ expandedValue: next }) => (expandedValue = next)}
    >
      <TreeView.Tree class={treeStyles.Tree}>
        {#each sections as node, index (node.id)}
          {@render renderNode(node, [index])}
        {/each}
      </TreeView.Tree>
    </TreeView.Root>
  </Toc.Nav>
</div>

{#snippet renderNode(node: TocNode, indexPath: number[])}
  <TreeView.NodeProvider {node} {indexPath}>
    {#if node.children}
      <TreeView.Branch class={treeStyles.Branch}>
        <TreeView.BranchControl class={treeStyles.BranchControl}>
          <TreeView.BranchIndicator class={treeStyles.BranchIndicator}>
            <ChevronRightIcon />
          </TreeView.BranchIndicator>
          <TreeView.BranchText class={treeStyles.BranchText}>
            <Toc.Context>
              {#snippet render(toc)}
                <a
                  class={tocStyles.TreeLink}
                  {...toc().getLinkProps({ item: { value: node.id, depth: node.depth } })}
                >{node.name}</a>
              {/snippet}
            </Toc.Context>
          </TreeView.BranchText>
        </TreeView.BranchControl>
        <TreeView.BranchContent class={treeStyles.BranchContent}>
          <TreeView.BranchIndentGuide class={treeStyles.BranchIndentGuide} />
          {#each node.children as child, i (child.id)}
            {@render renderNode(child, [...indexPath, i])}
          {/each}
        </TreeView.BranchContent>
      </TreeView.Branch>
    {:else}
      <TreeView.Item class={treeStyles.Item}>
        <TreeView.ItemText class={treeStyles.ItemText}>
          <Toc.Context>
            {#snippet render(toc)}
              <a
                class={tocStyles.TreeLink}
                {...toc().getLinkProps({ item: { value: node.id, depth: node.depth } })}
              >{node.name}</a>
            {/snippet}
          </Toc.Context>
        </TreeView.ItemText>
      </TreeView.Item>
    {/if}
  </TreeView.NodeProvider>
{/snippet}
