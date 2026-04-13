import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'introduction', depth: 5, label: 'Introduction' },
  { value: 'getting-started', depth: 2, label: 'Getting Started' },
  { value: 'installation', depth: 2, label: 'Installation' },
  { value: 'usage', depth: 2, label: 'Usage' },
  { value: 'configuration', depth: 2, label: 'Configuration' },
  { value: 'migration', depth: 2, label: 'Migration' },
  { value: 'faq', depth: 2, label: 'FAQ' },
  { value: 'troubleshooting', depth: 2, label: 'Troubleshooting' },
  { value: 'api-reference', depth: 2, label: 'API Reference' },
  { value: 'conclusion', depth: 2, label: 'Conclusion' },
]

const paragraphs = loremIpsum({ count: 6, units: 'paragraphs' })

export const Basic = () => (
  <Toc.Root className={styles.Root} items={items}>
    <Toc.Content className={styles.Content}>
      {items.map((item) => (
        <section key={item.value}>
          <h2 id={item.value}>{item.label}</h2>
          <p>{paragraphs}</p>
        </section>
      ))}
    </Toc.Content>
    <Toc.Nav className={styles.Nav}>
      <Toc.Title className={styles.Title}>On this page</Toc.Title>
      <Toc.List className={styles.List}>
        {items.map((item) => (
          <Toc.Item className={styles.Item} key={item.value} item={item}>
            <Toc.Link className={styles.Link} href={`#${item.value}`}>
              {item.label}
            </Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
