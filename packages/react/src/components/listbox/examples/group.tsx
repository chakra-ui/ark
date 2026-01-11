import { Listbox, createListCollection } from '@ark-ui/react/listbox'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/listbox.module.css'

export const Group = () => {
  const collection = createListCollection({
    items: [
      { label: 'New York', value: 'nyc', region: 'North America' },
      { label: 'Los Angeles', value: 'lax', region: 'North America' },
      { label: 'Toronto', value: 'yyz', region: 'North America' },
      { label: 'London', value: 'lhr', region: 'Europe' },
      { label: 'Paris', value: 'cdg', region: 'Europe' },
      { label: 'Berlin', value: 'ber', region: 'Europe' },
      { label: 'Tokyo', value: 'nrt', region: 'Asia Pacific' },
      { label: 'Singapore', value: 'sin', region: 'Asia Pacific' },
      { label: 'Sydney', value: 'syd', region: 'Asia Pacific' },
    ],
    groupBy: (item) => item.region,
  })

  return (
    <Listbox.Root className={styles.Root} collection={collection}>
      <Listbox.Label className={styles.Label}>Select Region</Listbox.Label>
      <Listbox.Content className={styles.Content}>
        {collection.group().map(([region, items]) => (
          <Listbox.ItemGroup className={styles.ItemGroup} key={region}>
            <Listbox.ItemGroupLabel className={styles.ItemGroupLabel}>{region}</Listbox.ItemGroupLabel>
            {items.map((item) => (
              <Listbox.Item className={styles.Item} key={item.value} item={item}>
                <Listbox.ItemText className={styles.ItemText}>{item.label}</Listbox.ItemText>
                <Listbox.ItemIndicator className={styles.ItemIndicator}>
                  <CheckIcon />
                </Listbox.ItemIndicator>
              </Listbox.Item>
            ))}
          </Listbox.ItemGroup>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}
