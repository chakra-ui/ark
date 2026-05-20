import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkComboboxClearTrigger,
  ArkComboboxContent,
  ArkComboboxControl,
  ArkComboboxInput,
  ArkComboboxItem,
  ArkComboboxItemIndicator,
  ArkComboboxItemText,
  ArkComboboxLabel,
  ArkComboboxPositioner,
  ArkComboboxRoot,
  ArkComboboxTrigger,
  type ComboboxInputValueChangeDetails,
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface Movie {
  id: string
  title: string
  year: number
  director: string
  genre: string
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

const buildCollection = (items: Movie[]): ListCollection<Movie> =>
  createListCollection<Movie>({
    items,
    itemToString: (item) => item.title,
    itemToValue: (item) => item.id,
  })

@Component({
  selector: 'combobox-async-search-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPortalComponent,
    ArkComboboxRoot,
    ArkComboboxLabel,
    ArkComboboxControl,
    ArkComboboxInput,
    ArkComboboxClearTrigger,
    ArkComboboxTrigger,
    ArkComboboxPositioner,
    ArkComboboxContent,
    ArkComboboxItem,
    ArkComboboxItemText,
    ArkComboboxItemIndicator,
  ],
  template: `
    <div
      arkComboboxRoot
      #root="arkComboboxRoot"
      [collection]="collection()"
      (inputValueChange)="onInputValueChange($event)"
    >
      <span arkComboboxLabel>Movie</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. Inception" />
        <button arkComboboxClearTrigger>×</button>
        <button arkComboboxTrigger>▾</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            @if (loading()) {
              <div class="combobox-status">
                <span class="combobox-spinner" aria-hidden="true">*</span>
                <span>Searching...</span>
              </div>
            } @else if (error()) {
              <div class="combobox-status">{{ error()?.message }}</div>
            } @else if (items().length === 0) {
              <div class="combobox-status">
                {{ filterText() ? 'No results found' : 'Start typing to search movies...' }}
              </div>
            } @else {
              @for (movie of collection().items; track movie.id) {
                <div arkComboboxItem [item]="movie">
                  <span arkComboboxItemText>
                    <span class="combobox-item-title">{{ movie.title }}</span>
                    <span class="combobox-item-subtitle">{{ movie.year }} · {{ movie.director }}</span>
                  </span>
                  <span arkComboboxItemIndicator>✓</span>
                </div>
              }
            }
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [comboboxExampleStyles],
})
export class ComboboxAsyncSearchExample {
  readonly items = signal<Movie[]>([])
  readonly filterText = signal('')
  readonly loading = signal(false)
  readonly error = signal<Error | null>(null)
  readonly collection = computed<ListCollection<Movie>>(() => buildCollection(this.items()))

  private searchId = 0

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    if (details.reason !== 'input-change') return

    const inputValue = details.inputValue
    this.filterText.set(inputValue)
    this.searchId++
    const currentSearchId = this.searchId

    if (!inputValue) {
      this.loading.set(false)
      this.error.set(null)
      this.items.set([])
      return
    }

    this.loading.set(true)
    this.error.set(null)

    setTimeout(() => {
      if (currentSearchId !== this.searchId) return

      const query = inputValue.toLowerCase()
      const items = allMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query) ||
          movie.director.toLowerCase().includes(query) ||
          movie.genre.toLowerCase().includes(query),
      )

      this.items.set(items)
      this.loading.set(false)
    }, 300)
  }
}
