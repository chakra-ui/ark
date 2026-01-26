import { Steps } from '@ark-ui/react/steps'
import button from 'styles/button.module.css'
import styles from 'styles/steps.module.css'

const items = [
  { value: 'first', title: 'First', description: 'Contact Info' },
  { value: 'second', title: 'Second', description: 'Date & Time' },
  { value: 'third', title: 'Third', description: 'Select Rooms' },
]

export const Vertical = () => {
  return (
    <Steps.Root className={styles.Root} count={items.length} orientation="vertical">
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
          <div className="vstack">
            <span>
              {item.title} - {item.description}
            </span>
            <div className={styles.Actions}>
              <Steps.PrevTrigger className={button.Root}>Back</Steps.PrevTrigger>
              <Steps.NextTrigger className={button.Root} data-variant="solid">
                Next
              </Steps.NextTrigger>
            </div>
          </div>
        </Steps.Content>
      ))}

      <Steps.CompletedContent className={styles.CompletedContent}>
        <div className="vstack">
          <span>Steps Complete - Thank you for filling out the form!</span>
          <Steps.PrevTrigger className={button.Root}>Back</Steps.PrevTrigger>
        </div>
      </Steps.CompletedContent>
    </Steps.Root>
  )
}
