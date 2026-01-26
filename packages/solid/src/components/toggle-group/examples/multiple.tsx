import { ToggleGroup } from '@ark-ui/solid/toggle-group'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-solid'
import styles from 'styles/toggle-group.module.css'

export const Multiple = () => {
  return (
    <ToggleGroup.Root defaultValue={['bold']} multiple class={styles.Root}>
      <ToggleGroup.Item value="bold" class={styles.Item}>
        <BoldIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" class={styles.Item}>
        <ItalicIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" class={styles.Item}>
        <UnderlineIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
