import { ToggleGroup } from '@ark-ui/solid/toggle-group'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import styles from 'styles/toggle-group.module.css'

export const Controlled = () => {
  const [value, setValue] = createSignal(['left'])
  return (
    <ToggleGroup.Root value={value()} onValueChange={(e) => setValue(e.value)} class={styles.Root}>
      <ToggleGroup.Item value="left" class={styles.Item}>
        <AlignLeftIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" class={styles.Item}>
        <AlignCenterIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" class={styles.Item}>
        <AlignRightIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="justify" class={styles.Item}>
        <AlignJustifyIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
