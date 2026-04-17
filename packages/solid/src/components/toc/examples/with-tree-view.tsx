import { Toc, useTocContext } from '@ark-ui/solid/toc'
import { TreeView, createTreeCollection } from '@ark-ui/solid/tree-view'
import { loremIpsum } from 'lorem-ipsum'
import { ChevronRightIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import tocStyles from 'styles/toc.module.css'
import treeStyles from 'styles/tree-view.module.css'

const p = loremIpsum({ count: 7, units: 'paragraphs' })

type TocNode = {
  id: string
  name: string
  depth: number
  lines?: number
  children?: TocNode[]
}

const sections: TocNode[] = [
  {
    id: 'guides',
    name: 'Guides',
    depth: 2,
    lines: 10,
    children: [
      { id: 'quick-start', name: 'Quick Start', depth: 3, lines: 6 },
      { id: 'manual-setup', name: 'Manual Setup', depth: 3, lines: 5 },
    ],
  },
  {
    id: 'core-concepts',
    name: 'Core Concepts',
    depth: 2,
    lines: 9,
    children: [
      { id: 'toc-props', name: 'Props', depth: 3, lines: 7 },
      { id: 'toc-events', name: 'Events', depth: 3, lines: 6 },
      { id: 'toc-context', name: 'Context', depth: 3, lines: 8 },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    depth: 2,
    lines: 11,
    children: [
      { id: 'root-api', name: 'Root Provider', depth: 3, lines: 7 },
      { id: 'custom-rendering', name: 'Custom Rendering', depth: 3, lines: 6 },
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

const TocTreeNode = ({ node, indexPath }: TreeView.NodeProviderProps<TocNode>) => {
  const toc = useTocContext()
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch class={treeStyles.Branch}>
          <TreeView.BranchControl class={treeStyles.BranchControl}>
            <TreeView.BranchIndicator class={treeStyles.BranchIndicator}>
              <ChevronRightIcon />
            </TreeView.BranchIndicator>
            <TreeView.BranchText class={treeStyles.BranchText}>
              <a class={tocStyles.TreeLink} {...toc().getLinkProps({ item: { value: node.id, depth: node.depth } })}>
                {node.name}
              </a>
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent class={treeStyles.BranchContent}>
            <TreeView.BranchIndentGuide class={treeStyles.BranchIndentGuide} />
            {node.children.map((child, index) => (
              <TocTreeNode node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item class={treeStyles.Item}>
          <TreeView.ItemText class={treeStyles.ItemText}>
            <a class={tocStyles.TreeLink} {...toc().getLinkProps({ item: { value: node.id, depth: node.depth } })}>
              {node.name}
            </a>
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}

export const WithTreeView = () => {
  const [expandedValue, setExpandedValue] = createSignal<string[]>([])

  return (
    <Toc.Root
      id="toc-with-tree-view"
      class={tocStyles.Root}
      items={allItems}
      onActiveChange={({ activeItems }) => {
        const activeIds = new Set(activeItems.map((i) => i.value))
        const next = sections
          .filter(
            (section) => activeIds.has(section.id) || (section.children ?? []).some((child) => activeIds.has(child.id)),
          )
          .map((s) => s.id)
        setExpandedValue(next)
      }}
    >
      <Toc.Content class={tocStyles.Content}>
        {sections.map((section) => (
          <section>
            <h2 id={section.id}>{section.name}</h2>
            <div class={tocStyles.DummyText}>
              {Array.from({ length: section.lines ?? 5 }).map(() => (
                <div class={tocStyles.DummyLine} />
              ))}
            </div>
            {section.children?.map((child) => (
              <div>
                <h3 id={child.id}>{child.name}</h3>
                <div class={tocStyles.DummyText}>
                  {Array.from({ length: child.lines ?? 3 }).map(() => (
                    <div class={tocStyles.DummyLine} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </Toc.Content>

      <Toc.Nav class={tocStyles.Nav}>
        <Toc.Title class={tocStyles.Title}>On this page</Toc.Title>
        <TreeView.Root
          class={treeStyles.Root}
          collection={collection}
          expandedValue={expandedValue()}
          onExpandedChange={({ expandedValue: next }) => setExpandedValue(next)}
        >
          <TreeView.Tree class={treeStyles.Tree}>
            {sections.map((node, index) => (
              <TocTreeNode node={node} indexPath={[index]} />
            ))}
          </TreeView.Tree>
        </TreeView.Root>
      </Toc.Nav>
    </Toc.Root>
  )
}
