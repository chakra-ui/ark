import { Toc } from '@ark-ui/solid/toc'
import { Dynamic } from 'solid-js/web'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const paragraphs = loremIpsum({ count: 5, units: 'paragraphs' })

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
  { value: 'getting-started', depth: 2, label: 'Getting Started' },
  { value: 'installation', depth: 3, label: 'Installation' },
  { value: 'configuration', depth: 3, label: 'Configuration' },
  { value: 'api-reference', depth: 2, label: 'API Reference' },
  { value: 'hooks', depth: 3, label: 'Hooks' },
  { value: 'components', depth: 3, label: 'Components' },
  { value: 'examples', depth: 2, label: 'Examples' },
]

export const Nested = () => (
  <Toc.Root class={styles.Root} items={items}>
    <Toc.Content class={styles.Content}>
      {items.map((item) => (
        <section>
          <Dynamic component={item.depth === 2 ? 'h2' : 'h3'} id={item.value}>
            {item.label}
          </Dynamic>
          <p>{paragraphs}</p>
        </section>
      ))}
    </Toc.Content>

    <Toc.Nav class={styles.Nav}>
      <Toc.Title class={styles.Title}>On this page</Toc.Title>
      <Toc.List class={styles.List}>
        {items.map((item) => (
          <Toc.Item class={item.depth > 2 ? styles.ItemNested : styles.Item} item={item}>
            <Toc.Link class={styles.Link} href={`#${item.value}`}>
              {item.label}
            </Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
