import { RadioGroup } from '@ark-ui/solid/radio-group'
import { For, createSignal } from 'solid-js'
import styles from 'styles/radio-group.module.css'

export const Controlled = () => {
  const frameworks = ['React', 'Solid', 'Vue']
  const [value, setValue] = createSignal<string | null>(null)

  return (
    <RadioGroup.Root class={styles.Root} value={value()} onValueChange={(e) => setValue(e.value)}>
      <RadioGroup.Label class={styles.Label}>Framework</RadioGroup.Label>
      <For each={frameworks}>
        {(framework) => (
          <RadioGroup.Item class={styles.Item} value={framework}>
            <RadioGroup.ItemControl class={styles.ItemControl} />
            <RadioGroup.ItemText class={styles.ItemText}>{framework}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        )}
      </For>
    </RadioGroup.Root>
  )
}
