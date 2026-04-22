import { Toc, useTocContext } from '@ark-ui/react/toc'
import { TreeView, createTreeCollection } from '@ark-ui/react/tree-view'
import { ChevronRightIcon } from 'lucide-react'
import { useState, useRef } from 'react'
import tocStyles from 'styles/toc.module.css'
import treeStyles from 'styles/tree-view.module.css'

type TocNode = {
  id: string
  name: string
  depth: number
  lines: number
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
  rootNode: { id: 'ROOT', name: '', depth: 0, lines: 0, children: sections },
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
        <TreeView.Branch className={treeStyles.Branch}>
          <TreeView.BranchControl className={treeStyles.BranchControl}>
            <TreeView.BranchIndicator className={treeStyles.BranchIndicator}>
              <ChevronRightIcon />
            </TreeView.BranchIndicator>
            <TreeView.BranchText className={treeStyles.BranchText}>
              <a className={tocStyles.TreeLink} {...toc.getLinkProps({ item: { value: node.id, depth: node.depth } })}>
                {node.name}
              </a>
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent className={treeStyles.BranchContent}>
            <TreeView.BranchIndentGuide className={treeStyles.BranchIndentGuide} />
            {node.children.map((child, index) => (
              <TocTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item className={treeStyles.Item}>
          <TreeView.ItemText className={treeStyles.ItemText}>
            <a className={tocStyles.TreeLink} {...toc.getLinkProps({ item: { value: node.id, depth: node.depth } })}>
              {node.name}
            </a>
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}

export const WithTreeView = () => {
  const [expandedValue, setExpandedValue] = useState<string[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <Toc.Root
      className={tocStyles.Root}
      items={allItems}
      getScrollEl={() => contentRef.current}
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
      <Toc.Content className={tocStyles.Content} ref={contentRef}>
        {sections.map((section) => (
          <section key={section.id}>
            <h2 id={section.id}>{section.name}</h2>
            <div className={tocStyles.DummyText}>
              {Array.from({ length: section.lines ?? 5 }, (_, i) => (
                <div key={i} className={tocStyles.DummyLine} />
              ))}
            </div>
            {section.children?.map((child) => (
              <div key={child.id}>
                <h3 id={child.id}>{child.name}</h3>
                <div className={tocStyles.DummyText}>
                  {Array.from({ length: child.lines ?? 3 }, (_, i) => (
                    <div key={i} className={tocStyles.DummyLine} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </Toc.Content>

      <Toc.Nav className={tocStyles.Nav}>
        <Toc.Title className={tocStyles.Title}>On this page</Toc.Title>
        <TreeView.Root
          className={treeStyles.Root}
          collection={collection}
          expandedValue={expandedValue}
          onExpandedChange={({ expandedValue: next }) => setExpandedValue(next)}
        >
          <TreeView.Tree className={treeStyles.Tree}>
            {sections.map((node, index) => (
              <TocTreeNode key={node.id} node={node} indexPath={[index]} />
            ))}
          </TreeView.Tree>
        </TreeView.Root>
      </Toc.Nav>
    </Toc.Root>
  )
}
