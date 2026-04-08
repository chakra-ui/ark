import { Toc } from '@ark-ui/react/toc'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'overview', depth: 2 },
  { value: 'installation', depth: 2 },
  { value: 'configuration', depth: 2 },
  { value: 'usage', depth: 2 },
]

export const Placement = () => {
  const [placement, setPlacement] = useState<'left' | 'right'>('left')

  return (
    <Toc.Root className={styles.Root} items={items}>
      <Toc.Content className={styles.Content}>
        <h2 id="overview">Overview</h2>
        <p>The placement prop controls whether the navigation sits on the left or right side of the content.</p>
        <h2 id="installation">Installation</h2>
        <p>Install the package and render your first component. No configuration required to get started.</p>
        <h2 id="configuration">Configuration</h2>
        <p>Edit the configuration file to match your project requirements. Most defaults work for typical use cases.</p>
        <h2 id="usage">Usage</h2>
        <p>Import the component and compose it using the compound component pattern.</p>
      </Toc.Content>

      <Toc.Nav className={styles.Nav} placement={placement}>
        <div className={styles.Controls}>
          <button
            className={button.Root}
            data-variant={placement === 'left' ? 'solid' : undefined}
            onClick={() => setPlacement('left')}
          >
            Left
          </button>
          <button
            className={button.Root}
            data-variant={placement === 'right' ? 'solid' : undefined}
            onClick={() => setPlacement('right')}
          >
            Right
          </button>
        </div>
        <Toc.Title className={styles.Title}>On this page</Toc.Title>
        <Toc.Indicator className={styles.Indicator} />
        <Toc.List className={styles.List}>
          {items.map((item) => (
            <Toc.Item className={styles.Item} key={item.value} item={item}>
              <Toc.Link className={styles.Link}>{item.value.replace(/-/g, ' ')}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
