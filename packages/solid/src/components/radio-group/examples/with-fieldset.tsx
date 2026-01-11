import { Fieldset } from '@ark-ui/solid/fieldset'
import { RadioGroup } from '@ark-ui/solid/radio-group'
import { For } from 'solid-js'
import fieldset from 'styles/fieldset.module.css'
import styles from 'styles/radio-group.module.css'

export const WithFieldset = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <Fieldset.Root class={fieldset.Root}>
      <Fieldset.Legend class={fieldset.Legend}>Select a framework</Fieldset.Legend>
      <RadioGroup.Root class={styles.Root}>
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
      <Fieldset.HelperText class={fieldset.HelperText}>Choose your preferred framework</Fieldset.HelperText>
      <Fieldset.ErrorText class={fieldset.ErrorText}>Please select a framework</Fieldset.ErrorText>
    </Fieldset.Root>
  )
}
