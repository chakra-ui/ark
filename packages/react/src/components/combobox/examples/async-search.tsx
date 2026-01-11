import { useAsyncList } from '@ark-ui/react/collection'
import { Combobox, createListCollection } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon, LoaderIcon, XIcon } from 'lucide-react'
import { startTransition } from 'react'
import styles from 'styles/combobox.module.css'

interface Movie {
  id: string
  title: string
  year: number
  director: string
  genre: string
}

export const AsyncSearch = () => {
  const list = useAsyncList<Movie>({
    async load({ filterText, signal }) {
      if (!filterText) return { items: [] }

      await new Promise((resolve) => setTimeout(resolve, 300))

      if (signal?.aborted) return { items: [] }

      const items = allMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(filterText.toLowerCase()) ||
          movie.director.toLowerCase().includes(filterText.toLowerCase()) ||
          movie.genre.toLowerCase().includes(filterText.toLowerCase()),
      )

      return { items }
    },
  })

  const collection = createListCollection({
    items: list.items,
    itemToString: (item) => item.title,
    itemToValue: (item) => item.id,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    if (details.reason === 'input-change') {
      startTransition(() => {
        list.setFilterText(details.inputValue)
      })
    }
  }

  return (
    <Combobox.Root className={styles.Root} collection={collection} onInputValueChange={handleInputChange}>
      <Combobox.Label className={styles.Label}>Movie</Combobox.Label>
      <Combobox.Control className={styles.Control}>
        <Combobox.Input className={styles.Input} placeholder="e.g. Inception" />
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
            {list.loading ? (
              <div className={styles.Status}>
                <LoaderIcon className={styles.Spinner} />
                <span>Searching...</span>
              </div>
            ) : list.error ? (
              <div className={styles.Status}>{list.error.message}</div>
            ) : list.items.length === 0 ? (
              <div className={styles.Status}>
                {list.filterText ? 'No results found' : 'Start typing to search movies...'}
              </div>
            ) : (
              collection.items.map((movie) => (
                <Combobox.Item className={styles.Item} key={movie.id} item={movie}>
                  <Combobox.ItemText className={styles.ItemText}>
                    <span className={styles.ItemTitle}>{movie.title}</span>
                    <span className={styles.ItemSubtitle}>
                      {movie.year} · {movie.director}
                    </span>
                  </Combobox.ItemText>
                  <Combobox.ItemIndicator className={styles.ItemIndicator}>
                    <CheckIcon />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              ))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const allMovies: Movie[] = [
  { id: 'inception', title: 'Inception', year: 2010, director: 'Christopher Nolan', genre: 'Sci-Fi' },
  { id: 'the-dark-knight', title: 'The Dark Knight', year: 2008, director: 'Christopher Nolan', genre: 'Action' },
  { id: 'pulp-fiction', title: 'Pulp Fiction', year: 1994, director: 'Quentin Tarantino', genre: 'Crime' },
  { id: 'the-godfather', title: 'The Godfather', year: 1972, director: 'Francis Ford Coppola', genre: 'Crime' },
  { id: 'forrest-gump', title: 'Forrest Gump', year: 1994, director: 'Robert Zemeckis', genre: 'Drama' },
  { id: 'the-matrix', title: 'The Matrix', year: 1999, director: 'The Wachowskis', genre: 'Sci-Fi' },
  { id: 'interstellar', title: 'Interstellar', year: 2014, director: 'Christopher Nolan', genre: 'Sci-Fi' },
  { id: 'parasite', title: 'Parasite', year: 2019, director: 'Bong Joon-ho', genre: 'Thriller' },
  {
    id: 'the-shawshank-redemption',
    title: 'The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    genre: 'Drama',
  },
  { id: 'fight-club', title: 'Fight Club', year: 1999, director: 'David Fincher', genre: 'Drama' },
  { id: 'goodfellas', title: 'Goodfellas', year: 1990, director: 'Martin Scorsese', genre: 'Crime' },
  {
    id: 'the-silence-of-the-lambs',
    title: 'The Silence of the Lambs',
    year: 1991,
    director: 'Jonathan Demme',
    genre: 'Thriller',
  },
]
