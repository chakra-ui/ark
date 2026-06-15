import { createGridCollection } from '@ark-ui/react/collection'
import { Listbox } from '@ark-ui/react/listbox'
import styles from 'styles/listbox.module.css'

export const Grid = () => {
  const collection = createGridCollection({
    items: [
      { label: '😀', value: 'grinning' },
      { label: '😍', value: 'heart-eyes' },
      { label: '🥳', value: 'partying' },
      { label: '😎', value: 'sunglasses' },
      { label: '🤩', value: 'star-struck' },
      { label: '😂', value: 'joy' },
      { label: '🥰', value: 'smiling-hearts' },
      { label: '😊', value: 'blush' },
      { label: '🤗', value: 'hugging' },
      { label: '😇', value: 'innocent' },
      { label: '🔥', value: 'fire' },
      { label: '✨', value: 'sparkles' },
      { label: '💯', value: 'hundred' },
      { label: '🎉', value: 'tada' },
      { label: '❤️', value: 'heart' },
      { label: '👍', value: 'thumbs-up' },
      { label: '👏', value: 'clap' },
      { label: '🚀', value: 'rocket' },
      { label: '⭐', value: 'star' },
      { label: '🌈', value: 'rainbow' },
    ],
    columnCount: 5,
  })

  return (
    <Listbox.Root className={styles.Root} collection={collection}>
      <Listbox.Label className={styles.Label}>Pick a reaction</Listbox.Label>
      <Listbox.Content className={styles.GridContent}>
        <Listbox.List className={styles.List}>
          {collection.items.map((item) => (
            <Listbox.Item className={styles.GridItem} key={item.value} item={item}>
              <Listbox.ItemText>{item.label}</Listbox.ItemText>
            </Listbox.Item>
          ))}
        </Listbox.List>
      </Listbox.Content>
    </Listbox.Root>
  )
}
