import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { Toc } from '@ark-ui/react/toc'
import button from 'styles/button.module.css'
import popoverStyles from 'styles/popover.module.css'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2 },
  { value: 'installation', depth: 2 },
  { value: 'usage', depth: 2 },
  { value: 'api-reference', depth: 2 },
]

export const Floating = () => (
  <Toc.Root items={items}>
    <div className={styles.FloatingWrapper}>
      <div className={styles.FloatingHeader}>
        <span className={styles.FloatingTitle}>Article</span>
        <Popover.Root>
          <Popover.Trigger className={button.Root}>Contents ↓</Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content className={popoverStyles.Content}>
                <Toc.Nav className={styles.FloatingNav}>
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
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </div>

      <Toc.Content className={styles.Content}>
        <h2 id="introduction">Introduction</h2>
        <p>A table of contents helps readers navigate long documents by providing quick links to each section.</p>
        <h2 id="installation">Installation</h2>
        <p>
          Install the package using your preferred package manager. The component has no external dependencies beyond
          the state machine.
        </p>
        <h2 id="usage">Usage</h2>
        <p>
          Import and compose using the compound component pattern. The Root manages the IntersectionObserver internally.
        </p>
        <h2 id="api-reference">API Reference</h2>
        <p>The full API reference documents all props, events, and methods available on each component part.</p>
      </Toc.Content>
    </div>
  </Toc.Root>
)
