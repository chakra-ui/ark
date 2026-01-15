import { ToggleGroup, useToggleGroup } from '@ark-ui/solid/toggle-group'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-solid'
import styles from 'styles/toggle-group.module.css'

export const RootProvider = () => {
  const toggleGroup = useToggleGroup({ defaultValue: ['left'] })

  return (
    <>
      <output>Selected: {String(toggleGroup().value)}</output>
      <ToggleGroup.RootProvider value={toggleGroup} class={styles.Root}>
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
      </ToggleGroup.RootProvider>
    </>
  )
}
