import { Accordion } from '@ark-ui/solid/accordion'
import { ChevronDownIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/accordion.module.css'

export const ItemContext = () => {
  return (
    <Accordion.Root class={styles.Root} defaultValue={['ark-ui']}>
      <Index each={items}>
        {(item) => (
          <Accordion.Item class={styles.Item} value={item().value}>
            <Accordion.ItemTrigger class={styles.ItemTrigger}>
              {item().title}
              <Accordion.ItemIndicator class={styles.ItemIndicator}>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
              <Accordion.ItemContext>
                {(context) => (
                  <div style={{ display: 'inline-flex', gap: '0.5rem', 'font-size': '0.75rem' }}>
                    <span>Expanded: {String(context().expanded)}</span>
                    <span>Focused: {String(context().focused)}</span>
                    <span>Disabled: {String(context().disabled)}</span>
                  </div>
                )}
              </Accordion.ItemContext>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent class={styles.ItemContent}>
              <div class={styles.ItemBody}>{item().content}</div>
            </Accordion.ItemContent>
          </Accordion.Item>
        )}
      </Index>
    </Accordion.Root>
  )
}

const items = [
  {
    value: 'ark-ui',
    title: 'What is Ark UI?',
    content: 'A headless component library for building accessible web apps.',
  },
  {
    value: 'getting-started',
    title: 'How to get started?',
    content: 'Install the package and import the components you need.',
  },
  {
    value: 'maintainers',
    title: 'Who maintains this project?',
    content: 'Ark UI is maintained by the Chakra UI team.',
  },
]
