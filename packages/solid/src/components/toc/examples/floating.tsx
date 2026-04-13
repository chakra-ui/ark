import { Popover } from '@ark-ui/solid/popover'
import { Portal } from '@ark-ui/solid/portal'
import { Toc } from '@ark-ui/solid/toc'
import { For } from 'solid-js'
import button from 'styles/button.module.css'
import popoverStyles from 'styles/popover.module.css'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 6, units: 'paragraphs' })

const items = [
  { value: 'introduction', depth: 1, label: 'Introduction' },
  { value: 'installation', depth: 1, label: 'Installation' },
  { value: 'usage', depth: 1, label: 'Usage' },
  { value: 'api-reference', depth: 1, label: 'API Reference' },
]

export const Floating = () => (
  <Toc.Root items={items}>
    <div class={styles.FloatingWrapper}>
      <div class={styles.FloatingHeader}>
        <span class={styles.FloatingTitle}>Article</span>
        <Popover.Root>
          <Popover.Trigger class={button.Root}>Contents ↓</Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content class={popoverStyles.Content}>
                <Toc.Nav class={styles.FloatingNav}>
                  <Toc.Title class={styles.Title}>On this page</Toc.Title>
                  <Toc.Indicator class={styles.Indicator} />
                  <Toc.List class={styles.List}>
                    <For each={items}>
                      {(item) => (
                        <Toc.Item class={styles.Item} item={item}>
                          <Toc.Link class={styles.Link}>{item.label}</Toc.Link>
                        </Toc.Item>
                      )}
                    </For>
                  </Toc.List>
                </Toc.Nav>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </div>

      <Toc.Content class={styles.Content}>
        <For each={items}>
          {(item) => (
            <section>
              <h2 id={item.value}>{item.label}</h2>
              <p>{p}</p>
            </section>
          )}
        </For>
      </Toc.Content>
    </div>
  </Toc.Root>
)
