import { Accordion } from '@ark-ui/react/accordion'
import { Slider } from '@ark-ui/react/slider'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/accordion.module.css'

export const WithSlider = () => {
  return (
    <Accordion.Root className={styles.Root} defaultValue={['ark-ui']}>
      {items.map((item) => (
        <Accordion.Item className={styles.Item} key={item.value} value={item.value}>
          <Accordion.ItemTrigger className={styles.ItemTrigger}>
            {item.title}
            <Accordion.ItemIndicator className={styles.ItemIndicator}>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent className={styles.ItemContent}>
            <div className={styles.ItemBody}>
              {item.content}
              <Slider.Root>
                <Slider.Label>Slider</Slider.Label>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb index={0} />
                </Slider.Control>
              </Slider.Root>
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
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
