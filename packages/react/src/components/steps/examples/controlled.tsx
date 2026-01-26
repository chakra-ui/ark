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
  const [step, setStep] = useState(0)

  return (
    <div className="stack">
      <output>current step: {step + 1}</output>

      <Steps.Root
        className={styles.Root}
        count={items.length}
        step={step}
        onStepChange={(details) => setStep(details.step)}
      >
        <Steps.List className={styles.List}>
          {items.map((item, index) => (
            <Steps.Item className={styles.Item} key={index} index={index}>
              <Steps.Trigger className={styles.Trigger}>
                <Steps.Indicator className={styles.Indicator}>{index + 1}</Steps.Indicator>
                <span>{item.title}</span>
              </Steps.Trigger>
              <Steps.Separator className={styles.Separator} />
            </Steps.Item>
          ))}
        </Steps.List>

        {items.map((item, index) => (
          <Steps.Content className={styles.Content} key={index} index={index}>
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
