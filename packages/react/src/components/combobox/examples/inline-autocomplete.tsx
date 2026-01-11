import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import styles from 'styles/combobox.module.css'

export const InlineAutocomplete = () => {
  const { startsWith } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems: [
      { label: 'Whale', value: 'whale' },
      { label: 'Dolphin', value: 'dolphin' },
      { label: 'Shark', value: 'shark' },
      { label: 'Octopus', value: 'octopus' },
      { label: 'Jellyfish', value: 'jellyfish' },
      { label: 'Seahorse', value: 'seahorse' },
    ],
    filter: startsWith,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root
      className={styles.Root}
      collection={collection}
      onInputValueChange={handleInputChange}
      inputBehavior="autocomplete"
    >
      <Combobox.Label className={styles.Label}>Sea Creature</Combobox.Label>
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. Dolphin" />
        <div className={styles.Indicators}>
          <Combobox.ClearTrigger className={styles.ClearTrigger}>
            <XIcon />
          </Combobox.ClearTrigger>
          <Combobox.Trigger className={styles.Trigger}>
            <ChevronsUpDownIcon />
          </Combobox.Trigger>
        </div>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content className={styles.Content}>
            <Combobox.Empty className={styles.Item}>No results found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item className={styles.Item} key={item.value} item={item}>
                <Combobox.ItemText className={styles.ItemText}>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator className={styles.ItemIndicator}>
                  <CheckIcon />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
