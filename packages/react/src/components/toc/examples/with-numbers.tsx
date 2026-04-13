import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'executive-summary', depth: 2, label: 'Executive Summary' },
  { value: 'methodology', depth: 2, label: 'Methodology' },
  { value: 'findings', depth: 2, label: 'Findings' },
  { value: 'recommendations', depth: 2, label: 'Recommendations' },
  { value: 'conclusion', depth: 2, label: 'Conclusion' },
]

const paragraphs = loremIpsum({ count: 5, units: 'paragraphs' })

export const WithNumbers = () => (
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
      <Toc.Title className={styles.Title}>Contents</Toc.Title>
      <Toc.List className={styles.List}>
        {items.map((item, index) => (
          <Toc.Item className={styles.Item} key={item.value} item={item}>
            <Toc.Link className={styles.LinkNumbered} href={`#${item.value}`}>
              <span className={styles.Number}>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
