import { Listbox, createListCollection } from '@ark-ui/solid/listbox'
import { CheckIcon } from 'lucide-solid'
import { Index } from 'solid-js'
import styles from 'styles/listbox.module.css'

export const Horizontal = () => {
  const collection = createListCollection({
    items: [
      {
        title: 'Midnight Dreams',
        artist: 'Luna Ray',
        image: 'https://picsum.photos/seed/album1/300/300',
      },
      {
        title: 'Neon Skyline',
        artist: 'The Electric',
        image: 'https://picsum.photos/seed/album2/300/300',
      },
      {
        title: 'Acoustic Sessions',
        artist: 'Sarah Woods',
        image: 'https://picsum.photos/seed/album3/300/300',
      },
      {
        title: 'Urban Echoes',
        artist: 'Metro Collective',
        image: 'https://picsum.photos/seed/album4/300/300',
      },
      {
        title: 'Summer Vibes',
        artist: 'Coastal Waves',
        image: 'https://picsum.photos/seed/album5/300/300',
      },
    ],
    itemToValue: (item) => item.title,
    itemToString: (item) => item.title,
  })

  return (
    <Listbox.Root class={styles.Root} collection={collection} orientation="horizontal">
      <Listbox.Label class={styles.Label}>Select Album</Listbox.Label>
      <Listbox.Content class={styles.Content}>
        <Index each={collection.items}>
          {(item) => (
            <Listbox.Item class={styles.ItemCard} item={item()}>
              <Listbox.ItemIndicator class={styles.ItemCardIndicator}>
                <CheckIcon />
              </Listbox.ItemIndicator>
              <img class={styles.ItemCardImage} src={item().image} alt={item().title} />
              <span class={styles.ItemCardTitle}>{item().title}</span>
              <span class={styles.ItemCardArtist}>{item().artist}</span>
            </Listbox.Item>
          )}
        </Index>
      </Listbox.Content>
    </Listbox.Root>
  )
}
