import { createGridCollection } from '@ark-ui/solid/collection'
import { Listbox } from '@ark-ui/solid/listbox'
import { Index } from 'solid-js'
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
    <Listbox.Root class={styles.Root} collection={collection}>
      <Listbox.Label class={styles.Label}>Pick a reaction</Listbox.Label>
      <Listbox.Content class={styles.GridContent}>
        <Listbox.List class={styles.List}>
          <Index each={collection.items}>
            {(item) => (
              <Listbox.Item class={styles.GridItem} item={item()}>
                <Listbox.ItemText>{item().label}</Listbox.ItemText>
              </Listbox.Item>
            )}
          </Index>
        </Listbox.List>
      </Listbox.Content>
    </Listbox.Root>
  )
}
