import { Combobox, useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import styles from 'styles/combobox.module.css'

export const Grouping = () => {
  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    initialItems,
    filter: contains,
    groupBy: (item) => item.continent,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root className={styles.Root} collection={collection} onInputValueChange={handleInputChange}>
      <Combobox.Label className={styles.Label}>Country</Combobox.Label>
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. Canada" />
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
            {collection.group().map(([continent, group]) => (
              <Combobox.ItemGroup className={styles.ItemGroup} key={continent}>
                <Combobox.ItemGroupLabel className={styles.ItemGroupLabel}>{continent}</Combobox.ItemGroupLabel>
                {group.map((item) => (
                  <Combobox.Item className={styles.Item} key={item.value} item={item}>
                    <Combobox.ItemText className={styles.ItemText}>{item.label}</Combobox.ItemText>
                    <Combobox.ItemIndicator className={styles.ItemIndicator}>
                      <CheckIcon />
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                ))}
              </Combobox.ItemGroup>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const initialItems = [
  { label: 'Canada', value: 'ca', continent: 'North America' },
  { label: 'United States', value: 'us', continent: 'North America' },
  { label: 'Mexico', value: 'mx', continent: 'North America' },
  { label: 'United Kingdom', value: 'uk', continent: 'Europe' },
  { label: 'Germany', value: 'de', continent: 'Europe' },
  { label: 'France', value: 'fr', continent: 'Europe' },
  { label: 'Japan', value: 'jp', continent: 'Asia' },
  { label: 'South Korea', value: 'kr', continent: 'Asia' },
  { label: 'China', value: 'cn', continent: 'Asia' },
]
