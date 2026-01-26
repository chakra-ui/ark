import { Listbox, createListCollection } from '@ark-ui/react/listbox'
import { CheckIcon } from 'lucide-react'
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
    <Listbox.Root className={styles.Root} collection={collection} orientation="horizontal">
      <Listbox.Label className={styles.Label}>Select Album</Listbox.Label>
      <Listbox.Content className={styles.Content}>
        {collection.items.map((item) => (
          <Listbox.Item className={styles.ItemCard} key={item.title} item={item}>
            <Listbox.ItemIndicator className={styles.ItemCardIndicator}>
              <CheckIcon />
            </Listbox.ItemIndicator>
            <img className={styles.ItemCardImage} src={item.image} alt={item.title} />
            <span className={styles.ItemCardTitle}>{item.title}</span>
            <span className={styles.ItemCardArtist}>{item.artist}</span>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}
