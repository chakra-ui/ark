import { ToggleGroup } from '@ark-ui/react/toggle-group'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import styles from 'styles/toggle-group.module.css'

export const Multiple = () => {
  return (
    <ToggleGroup.Root defaultValue={['bold']} multiple className={styles.Root}>
      <ToggleGroup.Item value="bold" className={styles.Item}>
        <BoldIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" className={styles.Item}>
        <ItalicIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="underline" className={styles.Item}>
        <UnderlineIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
