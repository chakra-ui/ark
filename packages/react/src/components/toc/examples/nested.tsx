import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const paragraphs = loremIpsum({ count: 7, units: 'paragraphs' })

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
  <Toc.Root className={styles.Root} items={items}>
    <Toc.Content className={styles.Content}>
      {items.map((item) => {
        const Heading = item.depth === 2 ? 'h2' : 'h3'
        return (
          <section key={item.value}>
            <Heading id={item.value}>{item.label}</Heading>
            <p>{paragraphs}</p>
          </section>
        )
      })}
    </Toc.Content>

    <Toc.Nav className={styles.Nav}>
      <Toc.Title className={styles.Title}>On this page</Toc.Title>
      <Toc.List className={styles.List}>
        {items.map((item) => (
          <Toc.Item className={item.depth > 2 ? styles.ItemNested : styles.Item} key={item.value} item={item}>
            <Toc.Link className={styles.Link} href={`#${item.value}`}>
              {item.label}
            </Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
