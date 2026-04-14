import { Toc, useToc } from '@ark-ui/solid/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction' },
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

export const RootProvider = () => {
  const toc = useToc({ items })

  return (
    <Toc.RootProvider class={styles.Root} value={toc}>
      <Toc.Content class={styles.Content}>
        {items.map((item) => (
          <section>
            <h2 id={item.value}>{item.label}</h2>
            <p>{paragraphs}</p>
          </section>
        ))}
      </Toc.Content>

      <Toc.Nav class={styles.Nav}>
        <p class={styles.ActiveIds}>Active: {toc().activeIds.length > 0 ? toc().activeIds.join(', ') : '—'}</p>
        <Toc.Title class={styles.Title}>On this page</Toc.Title>
        <Toc.List class={styles.List}>
          {items.map((item) => (
            <Toc.Item class={styles.Item} item={item}>
              <Toc.Link class={styles.Link} href={`#${item.value}`}>
                {item.label}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.RootProvider>
  )
}
