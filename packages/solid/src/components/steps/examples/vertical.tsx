import { Steps } from '@ark-ui/solid/steps'
import { For } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/steps.module.css'

const items = [
  { value: 'first', title: 'First', description: 'Contact Info' },
  { value: 'second', title: 'Second', description: 'Date & Time' },
  { value: 'third', title: 'Third', description: 'Select Rooms' },
]

export const Vertical = () => {
  return (
    <Steps.Root class={styles.Root} count={items.length} orientation="vertical">
      <Steps.List class={styles.List}>
        <For each={items}>
          {(item, index) => (
            <Steps.Item class={styles.Item} index={index()}>
              <Steps.Trigger class={styles.Trigger}>
                <Steps.Indicator class={styles.Indicator}>{index() + 1}</Steps.Indicator>
                <span>{item.title}</span>
              </Steps.Trigger>
              <Steps.Separator class={styles.Separator} />
            </Steps.Item>
          )}
        </For>
      </Steps.List>

      <For each={items}>
        {(item, index) => (
          <Steps.Content class={styles.Content} index={index()}>
            <div class="vstack">
              <span>
                {item.title} - {item.description}
              </span>
              <div class={styles.Actions}>
                <Steps.PrevTrigger class={button.Root}>Back</Steps.PrevTrigger>
                <Steps.NextTrigger class={button.Root} data-variant="solid">
                  Next
                </Steps.NextTrigger>
              </div>
            </div>
          </Steps.Content>
        )}
      </For>

      <Steps.CompletedContent class={styles.CompletedContent}>
        <div class="vstack">
          <span>Steps Complete - Thank you for filling out the form!</span>
          <Steps.PrevTrigger class={button.Root}>Back</Steps.PrevTrigger>
        </div>
      </Steps.CompletedContent>
    </Steps.Root>
  )
}
