import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const items = [
  { value: 'overview', depth: 2, label: 'Overview' },
  { value: 'architecture', depth: 2, label: 'Architecture' },
  { value: 'state-machines', depth: 2, label: 'State Machines' },
  { value: 'components', depth: 2, label: 'Components' },
  { value: 'theming', depth: 2, label: 'Theming' },
  { value: 'accessibility', depth: 2, label: 'Accessibility' },
  { value: 'conclusion', depth: 2, label: 'Conclusion' },
]

const paragraphs = loremIpsum({ count: 7, units: 'paragraphs' })

export const WithIndicator = () => (
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
        <Toc.Indicator className={styles.Indicator} />
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
