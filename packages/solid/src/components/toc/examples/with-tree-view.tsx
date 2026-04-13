import { Toc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'

const sections = [
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

const flattenSections = (nodes) =>
  nodes.flatMap((node) => [node, ...(node.children ? flattenSections(node.children) : [])])

const items = flattenSections(sections).map(({ id, name, depth }) => ({ value: id, label: name, depth }))

export default function WithTreeView() {
  return (
    <Toc.Root class={styles.Root} items={items}>
      <Toc.Content class={styles.Content}>
        {sections.map((section) => (
          <div key={section.id}>
            <h2 id={section.id}>{section.name}</h2>
            {section.children &&
              section.children.map((child) => (
                <h3 id={child.id} key={child.id}>
                  {child.name}
                </h3>
              ))}
          </div>
        ))}
      </Toc.Content>
      <Toc.Nav class={styles.Nav}>
        <Toc.Title class={styles.Title}>On this page</Toc.Title>
        <Toc.List class={styles.List}>
          {items.map((item) => (
            <Toc.Item class={styles.Item} item={item}>
              <Toc.Link class={styles.Link}>{item.label}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
