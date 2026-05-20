import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  effect,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkComboboxContent,
  ArkComboboxControl,
  ArkComboboxInput,
  ArkComboboxItem,
  ArkComboboxItemIndicator,
  ArkComboboxItemText,
  ArkComboboxLabel,
  ArkComboboxPositioner,
  ArkComboboxRootProvider,
  useCombobox,
  type ComboboxInputValueChangeDetails,
  type UseComboboxReturn,
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface Character {
  name: string
  height: string
  mass: string
  created: string
  edited: string
  url: string
}

interface CharactersResponse {
  results: Character[]
}

const buildCollection = (items: Character[]): ListCollection<Character> =>
  createListCollection<Character>({
    items,
    itemToString: (item) => item.name,
    itemToValue: (item) => item.name,
  })

@Component({
  selector: 'combobox-rehydrate-value-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPortalComponent,
    ArkComboboxRootProvider,
    ArkComboboxLabel,
    ArkComboboxControl,
    ArkComboboxInput,
    ArkComboboxPositioner,
    ArkComboboxContent,
    ArkComboboxItem,
    ArkComboboxItemText,
    ArkComboboxItemIndicator,
  ],
  template: `
    <div arkComboboxRootProvider #provider="arkComboboxRootProvider" [value]="combobox">
      <span arkComboboxLabel>Search Star Wars Characters</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. Luke" />
      </div>

      <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            @if (loading()) {
              <span class="combobox-status">Loading...</span>
            } @else if (error()) {
              <span class="combobox-status">{{ error()?.message }}</span>
            } @else {
              @for (item of collection().items; track item.name) {
                <div arkComboboxItem [item]="item">
                  <span arkComboboxItemText>{{ item.name }} - {{ item.height }}cm / {{ item.mass }}kg</span>
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
export class ComboboxRehydrateValueExample {
  readonly inputValue = signal('')
  readonly items = signal<Character[]>([])
  readonly collection = signal<ListCollection<Character>>(buildCollection([]))
  readonly loading = signal(false)
  readonly error = signal<Error | null>(null)
  readonly combobox: UseComboboxReturn<Character> = runInInjectionContext(inject(Injector), () =>
    useCombobox<Character>({
      context: () => ({
        collection: this.collection(),
        defaultValue: ['C-3PO'],
        placeholder: 'Example: Dexter',
        inputValue: this.inputValue(),
        onInputValueChange: (details: ComboboxInputValueChangeDetails) => {
          this.inputValue.set(details.inputValue)
          this.loadCharacters(details.inputValue)
        },
      }),
    }),
  )

  private hydrated = false
  private searchId = 0

  constructor() {
    effect(() => {
      const api = this.combobox.api()
      if (api.value.length && this.collection().size && !this.hydrated) {
        api.syncSelectedItems()
        this.hydrated = true
      }
    })

    this.loadCharacters('')
  }

  private loadCharacters(inputValue: string): void {
    this.searchId++
    const currentSearchId = this.searchId
    this.loading.set(true)
    this.error.set(null)

    fetch(`https://swapi.py4e.com/api/people/?search=${encodeURIComponent(inputValue)}`)
      .then((response) => response.json() as Promise<CharactersResponse>)
      .then((data) => {
        if (currentSearchId !== this.searchId) return
        this.items.set(data.results)
        this.collection.set(buildCollection(data.results))
      })
      .catch((error: unknown) => {
        if (currentSearchId !== this.searchId) return
        this.error.set(error instanceof Error ? error : new Error(String(error)))
      })
      .finally(() => {
        if (currentSearchId === this.searchId) this.loading.set(false)
      })
  }
}
