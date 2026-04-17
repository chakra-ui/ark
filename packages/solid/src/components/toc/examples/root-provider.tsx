import { Toc, useToc } from '@ark-ui/solid/toc'
import { Index } from 'solid-js'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'introduction', depth: 2, label: 'Introduction', lines: 12 },
  { value: 'getting-started', depth: 2, label: 'Getting Started', lines: 10 },
  { value: 'installation', depth: 2, label: 'Installation', lines: 8 },
  { value: 'usage', depth: 2, label: 'Usage', lines: 14 },
  { value: 'conclusion', depth: 2, label: 'Conclusion', lines: 10 },
]

export const RootProvider = () => {
  const toc = useToc({ items, rootMargin: '0px 0px -80% 0px' })

  return (
    <Toc.RootProvider class={styles.Root} value={toc}>
      <Toc.Content class={styles.Content}>
        <div class={styles.ContentSection}>
          <Index each={items}>
            {(item) => (
              <section>
                <h2 id={item().value}>{item().label}</h2>
                <div class={styles.DummyText}>
                  <Index each={Array.from({ length: item().lines })}>{() => <div class={styles.DummyLine} />}</Index>
                </div>
              </section>
            )}
          </Index>
        </div>
      </Toc.Content>

      <Toc.Nav class={styles.Nav}>
        <output>active: {JSON.stringify(toc().activeIds)}</output>
        <Toc.Title class={styles.Title}>On this page</Toc.Title>
        <Toc.List class={styles.List}>
          <Index each={items}>
            {(item) => (
              <Toc.Item class={styles.Item} item={item()}>
                <Toc.Link class={styles.Link} href={`#${item().value}`}>
                  {item().label}
                </Toc.Link>
              </Toc.Item>
            )}
          </Index>
        </Toc.List>
      </Toc.Nav>
    </Toc.RootProvider>
  )
}
