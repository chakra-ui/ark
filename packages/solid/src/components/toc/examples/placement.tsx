import { Toc } from '@ark-ui/solid/toc'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 1, units: 'paragraphs' })

const items = [
  { value: 'overview', depth: 2, label: 'Overview' },
  { value: 'installation', depth: 2, label: 'Installation' },
  { value: 'configuration', depth: 2, label: 'Configuration' },
  { value: 'usage', depth: 2, label: 'Usage' },
]

export const Placement = () => {
  const [placement, setPlacement] = createSignal<'left' | 'right'>('left')

  return (
    <Toc.Root class={styles.Root} items={items}>
      <Toc.Content class={styles.Content}>
        <h2 id="overview">Overview</h2>
        <p>{p}</p>
        <h2 id="installation">Installation</h2>
        <p>{p}</p>
        <h2 id="configuration">Configuration</h2>
        <p>{p}</p>
        <h2 id="usage">Usage</h2>
        <p>{p}</p>
      </Toc.Content>

      <Toc.Nav class={styles.Nav} placement={placement()}>
        <div class={styles.Controls}>
          <button
            class={button.Root}
            data-variant={placement() === 'left' ? 'solid' : undefined}
            onClick={() => setPlacement('left')}
          >
            Left
          </button>
          <button
            class={button.Root}
            data-variant={placement() === 'right' ? 'solid' : undefined}
            onClick={() => setPlacement('right')}
          >
            Right
          </button>
        </div>
        <Toc.Title class={styles.Title}>On this page</Toc.Title>
        <Toc.Indicator class={styles.Indicator} />
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
