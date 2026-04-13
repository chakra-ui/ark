import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { Toc } from '@ark-ui/react/toc'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import comboboxStyles from 'styles/combobox.module.css'
import styles from 'styles/toc.module.css'
import { loremIpsum } from 'lorem-ipsum'

const p = loremIpsum({ count: 6, units: 'paragraphs' })

const items = [
  { value: 'introduction', depth: 1, label: 'Introduction' },
  { value: 'installation', depth: 1, label: 'Installation' },
  { value: 'usage', depth: 1, label: 'Usage' },
  { value: 'api-reference', depth: 1, label: 'API Reference' },
  { value: 'examples', depth: 1, label: 'Examples' },
]

export const WithCombobox = () => {
  const { contains } = useFilter({ sensitivity: 'base' })
  const { collection, filter } = useListCollection({
    initialItems: items.map(({ label, value }) => ({ label, value })),
    filter: contains,
  })

  return (
    <Toc.Root className={styles.Root} items={items}>
      <Toc.Content className={styles.Content}>
        {items.map((item) => (
          <section key={item.value}>
            <h2 id={item.value}>{item.label}</h2>
            <p>{p}</p>
          </section>
        ))}
      </Toc.Content>

      <Toc.Nav className={styles.Nav}>
        <Combobox.Root
          className={comboboxStyles.Root}
          collection={collection}
          onInputValueChange={(d) => filter(d.inputValue)}
          onValueChange={(d) => {
            document.getElementById(d.value[0])?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <Combobox.Control className={comboboxStyles.Control}>
            <Combobox.Input className={comboboxStyles.Input} placeholder="Search sections..." />
            <div className={comboboxStyles.Indicators}>
              <Combobox.ClearTrigger className={comboboxStyles.ClearTrigger}>
                <XIcon />
              </Combobox.ClearTrigger>
              <Combobox.Trigger className={comboboxStyles.Trigger}>
                <ChevronsUpDownIcon />
              </Combobox.Trigger>
            </div>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content className={comboboxStyles.Content}>
                {collection.items.map((item) => (
                  <Combobox.Item className={comboboxStyles.Item} key={item.value} item={item}>
                    <Combobox.ItemText className={comboboxStyles.ItemText}>{item.label}</Combobox.ItemText>
                    <Combobox.ItemIndicator className={comboboxStyles.ItemIndicator}>
                      <CheckIcon />
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                ))}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
        <Toc.List className={styles.List}>
          {items.map((item) => (
            <Toc.Item className={styles.Item} key={item.value} item={item}>
              <Toc.Link className={styles.Link}>{item.label}</Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
    </Toc.Root>
  )
}
