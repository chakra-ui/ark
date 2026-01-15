import { ToggleGroup, useToggleGroup } from '@ark-ui/react/toggle-group'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'
import styles from 'styles/toggle-group.module.css'

export const RootProvider = () => {
  const toggleGroup = useToggleGroup({ defaultValue: ['left'] })

  return (
    <>
      <output>Set to Center: {String(toggleGroup.value)}</output>
      <ToggleGroup.RootProvider value={toggleGroup} className={styles.Root}>
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
      </ToggleGroup.RootProvider>
    </>
  )
}
