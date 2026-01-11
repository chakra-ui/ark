import { RadioGroup } from '@ark-ui/solid/radio-group'
import { For } from 'solid-js'
import styles from 'styles/radio-group.module.css'

export const Orientation = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root class={styles.Root} defaultValue="React" orientation="horizontal">
      <RadioGroup.Label class={styles.Label}>Framework</RadioGroup.Label>
      <div class="hstack">
        <For each={frameworks}>
          {(framework) => (
            <RadioGroup.Item class={styles.Item} value={framework}>
              <RadioGroup.ItemControl class={styles.ItemControl} />
              <RadioGroup.ItemText class={styles.ItemText}>{framework}</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          )}
        </For>
      </div>
    </RadioGroup.Root>
  )
}
