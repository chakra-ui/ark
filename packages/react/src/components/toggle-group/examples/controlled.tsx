import { ToggleGroup } from '@ark-ui/react/toggle-group'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/toggle-group.module.css'

export const Controlled = () => {
  const [value, setValue] = useState(['left'])
  return (
    <ToggleGroup.Root value={value} onValueChange={(e) => setValue(e.value)} className={styles.Root}>
      <ToggleGroup.Item value="left" className={styles.Item}>
        <AlignLeftIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" className={styles.Item}>
        <AlignCenterIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" className={styles.Item}>
        <AlignRightIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="justify" className={styles.Item}>
        <AlignJustifyIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
