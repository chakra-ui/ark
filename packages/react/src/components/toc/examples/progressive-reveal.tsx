import { Toc, type TocActiveChangeDetails } from '@ark-ui/react/toc'
import { useState } from 'react'
import styles from 'styles/toc.module.css'

const sections = [
  {
    item: { value: 'design-system', depth: 2 },
    children: [
      { value: 'typography', depth: 3 },
      { value: 'color-palette', depth: 3 },
      { value: 'spacing', depth: 3 },
    ],
  },
  {
    item: { value: 'components', depth: 2 },
    children: [
      { value: 'buttons', depth: 3 },
      { value: 'forms', depth: 3 },
      { value: 'navigation', depth: 3 },
    ],
  },
  {
    item: { value: 'patterns', depth: 2 },
    children: [
      { value: 'feedback', depth: 3 },
      { value: 'data-display', depth: 3 },
    ],
  },
]

const allItems = sections.flatMap((s) => [s.item, ...s.children])

const label = (value: string) => value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

export const ProgressiveReveal = () => {
  const [activeIds, setActiveIds] = useState<string[]>([])

  const activeParent = sections.find(
    (s) => activeIds.includes(s.item.value) || s.children.some((c) => activeIds.includes(c.value)),
  )?.item.value

  return (
    <Toc.Root
      className={styles.Root}
      items={allItems}
      onActiveChange={(details: TocActiveChangeDetails) => setActiveIds(details.activeIds)}
    >
      <Toc.Content className={styles.Content}>
        <h2 id="design-system">Design System</h2>
        <p>The foundation of visual consistency across products.</p>
        <h3 id="typography">Typography</h3>
        <p>Type scales, font choices, and heading hierarchy.</p>
        <h3 id="color-palette">Color Palette</h3>
        <p>Semantic color tokens for light and dark modes.</p>
        <h3 id="spacing">Spacing</h3>
        <p>Consistent spacing units and layout rhythm.</p>
        <h2 id="components">Components</h2>
        <p>Reusable building blocks for interfaces.</p>
        <h3 id="buttons">Buttons</h3>
        <p>Primary, secondary, and tertiary action triggers.</p>
        <h3 id="forms">Forms</h3>
        <p>Input patterns and validation feedback.</p>
        <h3 id="navigation">Navigation</h3>
        <p>Menus, breadcrumbs, and wayfinding.</p>
        <h2 id="patterns">Patterns</h2>
        <p>Higher-level interaction and layout patterns.</p>
        <h3 id="feedback">Feedback</h3>
        <p>Toasts, alerts, and progress indicators.</p>
        <h3 id="data-display">Data Display</h3>
        <p>Tables, lists, and structured information.</p>
      </Toc.Content>

      <Toc.Nav className={styles.Nav}>
        <Toc.Title className={styles.Title}>On this page</Toc.Title>
        <Toc.Indicator className={styles.Indicator} />
        <Toc.List className={styles.List}>
          {sections.map((section) => (
            <Toc.Item key={section.item.value} item={section.item} className={styles.Item}>
              <Toc.Link className={styles.Link}>{label(section.item.value)}</Toc.Link>
              <ul className={styles.SubList} data-visible={activeParent === section.item.value || undefined}>
                {section.children.map((child) => (
                  <Toc.Item key={child.value} item={child} className={styles.Item}>
                    <Toc.Link className={styles.Link}>{label(child.value)}</Toc.Link>
                  </Toc.Item>
                ))}
              </ul>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
