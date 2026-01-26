import { Accordion, useAccordion } from '@ark-ui/react/accordion'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/accordion.module.css'

export const RootProvider = () => {
  const accordion = useAccordion({
    multiple: true,
    defaultValue: ['ark-ui'],
  })

  return (
    <div className="stack">
      <output>Value: {JSON.stringify(accordion.value)}</output>

      <Accordion.RootProvider className={styles.Root} value={accordion}>
        {items.map((item) => (
          <Accordion.Item className={styles.Item} key={item.value} value={item.value}>
            <Accordion.ItemTrigger className={styles.ItemTrigger}>
              {item.title}
              <Accordion.ItemIndicator className={styles.ItemIndicator}>
                <ChevronDownIcon />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent className={styles.ItemContent}>
              <div className={styles.ItemBody}>{item.content}</div>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.RootProvider>
    </div>
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
