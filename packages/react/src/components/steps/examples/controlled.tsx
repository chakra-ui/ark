import { Steps } from '@ark-ui/react/steps'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/steps.module.css'

const items = [
  { value: 'first', title: 'First', description: 'Contact Info' },
  { value: 'second', title: 'Second', description: 'Date & Time' },
  { value: 'third', title: 'Third', description: 'Select Rooms' },
]

export const Controlled = () => {
  const [value, setValue] = useState<string | null>('first')

  return (
    <div className="stack">
      <output>current step: {value}</output>

      <Steps.Root
        className={styles.Root}
        items={items}
        value={value ?? undefined}
        onValueChange={(details) => setValue(details.value)}
      >
        <Steps.List className={styles.List}>
          {items.map((item, index) => (
            <Steps.Item className={styles.Item} key={item.value} value={item.value}>
              <Steps.Trigger className={styles.Trigger}>
                <Steps.Indicator className={styles.Indicator}>{index + 1}</Steps.Indicator>
                <span>{item.title}</span>
              </Steps.Trigger>
              <Steps.Separator className={styles.Separator} />
            </Steps.Item>
          ))}
        </Steps.List>

        {items.map((item) => (
          <Steps.Content className={styles.Content} key={item.value} value={item.value}>
            {item.title} - {item.description}
          </Steps.Content>
        ))}

        <Steps.CompletedContent className={styles.CompletedContent}>
          Steps Complete - Thank you for filling out the form!
        </Steps.CompletedContent>

        <div className={styles.Actions}>
          <Steps.PrevTrigger className={button.Root}>Back</Steps.PrevTrigger>
          <Steps.NextTrigger className={button.Root} data-variant="solid">
            Next
          </Steps.NextTrigger>
        </div>
      </Steps.Root>
    </div>
  )
}
