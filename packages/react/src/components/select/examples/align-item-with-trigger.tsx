import { Portal } from '@ark-ui/react/portal'
import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon } from 'lucide-react'
import styles from 'styles/select.module.css'

const frameworks = createListCollection({
  items: [
    { label: 'Angular', value: 'angular' },
    { label: 'Ember', value: 'ember' },
    { label: 'Lit', value: 'lit' },
    { label: 'Preact', value: 'preact' },
    { label: 'Qwik', value: 'qwik' },
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Vue', value: 'vue' },
  ],
})

export const AlignItemWithTrigger = () => {
  return (
    <Select.Root alignItemWithTrigger className={styles.Root} collection={frameworks} defaultValue={['solid']}>
      <Select.Label className={styles.Label}>Framework</Select.Label>
      <Select.Control className={styles.Control}>
        <Select.Trigger className={styles.Trigger}>
          <Select.ValueText className={styles.ValueText} placeholder="Select" />
          <Select.Indicator className={styles.Indicator}>
            <ChevronsUpDownIcon />
          </Select.Indicator>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content className={styles.Content}>
            <Select.ScrollArrow className={styles.ScrollArrow} placement="top">
              <ChevronUpIcon />
            </Select.ScrollArrow>
            <Select.List className={styles.List}>
              {frameworks.items.map((item) => (
                <Select.Item className={styles.Item} key={item.value} item={item}>
                  <Select.ItemText className={styles.ItemText}>{item.label}</Select.ItemText>
                  <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
            <Select.ScrollArrow className={styles.ScrollArrow} placement="bottom">
              <ChevronDownIcon />
            </Select.ScrollArrow>
          </Select.Content>
        </Select.Positioner>
      </Portal>
      <Select.HiddenSelect />
    </Select.Root>
  )
}
