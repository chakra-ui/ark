import { RadioGroup, useRadioGroup } from '@ark-ui/solid/radio-group'
import { For } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/radio-group.module.css'

export const RootProvider = () => {
  const frameworks = ['React', 'Solid', 'Vue']
  const radioGroup = useRadioGroup({ defaultValue: 'React' })

  return (
    <div class="stack">
      <RadioGroup.RootProvider class={styles.Root} value={radioGroup}>
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
      </RadioGroup.RootProvider>

      <button class={button.Root} onClick={() => radioGroup().setValue('Solid')}>
        Set to Solid
      </button>
    </div>
  )
}
