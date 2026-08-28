import { useAsyncList } from '@ark-ui/solid/collection'
import { Combobox, createListCollection } from '@ark-ui/solid/combobox'
import { CheckIcon, ChevronsUpDownIcon, LoaderIcon, XIcon } from 'lucide-solid'
import { For, createMemo } from 'solid-js'
import { Portal } from 'solid-js/web'
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

  const collection = createMemo(() =>
    createListCollection({
      items: list().items,
      itemToString: (item) => item.title,
      itemToValue: (item) => item.id,
    }),
  )

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    if (details.reason === 'input-change') {
      list().setFilterText(details.inputValue)
    }
  }

  return (
    <Combobox.Root class={styles.Root} collection={collection()} onInputValueChange={handleInputChange}>
      <Combobox.Label class={styles.Label}>Movie</Combobox.Label>
      <Combobox.Control class={styles.Control}>
        <Combobox.Input class={styles.Input} placeholder="e.g. Inception" />
        <div class={styles.Indicators}>
          <Combobox.ClearTrigger class={styles.ClearTrigger}>
            <XIcon />
          </Combobox.ClearTrigger>
          <Combobox.Trigger class={styles.Trigger}>
            <ChevronsUpDownIcon />
          </Combobox.Trigger>
        </div>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content class={styles.Content}>
            {list().loading ? (
              <div class={styles.Status}>
                <LoaderIcon class={styles.Spinner} />
                <span>Searching...</span>
              </div>
            ) : list().error ? (
              <div class={styles.Status}>{list().error.message}</div>
            ) : list().items.length === 0 ? (
              <div class={styles.Status}>
                {list().filterText ? 'No results found' : 'Start typing to search movies...'}
              </div>
            ) : (
              <For each={list().items}>
                {(movie) => (
                  <Combobox.Item class={styles.Item} item={movie}>
                    <Combobox.ItemText class={styles.ItemText}>
                      <span class={styles.ItemTitle}>{movie.title}</span>
                      <span class={styles.ItemSubtitle}>
                        {movie.year} · {movie.director}
                      </span>
                    </Combobox.ItemText>
                    <Combobox.ItemIndicator class={styles.ItemIndicator}>
                      <CheckIcon />
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                )}
              </For>
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
