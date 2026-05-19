import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  ArkComboboxRoot,
  ArkComboboxTrigger,
  type ComboboxInputValueChangeDetails,
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface City {
  label: string
  value: string
}

const cities: City[] = [
  { label: 'New York', value: 'new-york' },
  { label: 'Los Angeles', value: 'los-angeles' },
  { label: 'Chicago', value: 'chicago' },
  { label: 'Houston', value: 'houston' },
  { label: 'Phoenix', value: 'phoenix' },
  { label: 'Philadelphia', value: 'philadelphia' },
  { label: 'San Antonio', value: 'san-antonio' },
  { label: 'San Diego', value: 'san-diego' },
  { label: 'Dallas', value: 'dallas' },
  { label: 'San Jose', value: 'san-jose' },
  { label: 'Austin', value: 'austin' },
  { label: 'Jacksonville', value: 'jacksonville' },
  { label: 'Fort Worth', value: 'fort-worth' },
  { label: 'Columbus', value: 'columbus' },
  { label: 'Charlotte', value: 'charlotte' },
  { label: 'San Francisco', value: 'san-francisco' },
  { label: 'Indianapolis', value: 'indianapolis' },
  { label: 'Seattle', value: 'seattle' },
  { label: 'Denver', value: 'denver' },
  { label: 'Boston', value: 'boston' },
]

const LIMIT = 5

@Component({
  selector: 'combobox-limit-results-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPortalComponent,
    ArkComboboxRoot,
    ArkComboboxLabel,
    ArkComboboxControl,
    ArkComboboxInput,
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
      <span arkComboboxLabel>City</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. New York" />
        <button arkComboboxTrigger>▾</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            @for (item of collection().items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.label }}</span>
                <span arkComboboxItemIndicator>✓</span>
              </div>
            }
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [comboboxExampleStyles],
})
export class ComboboxLimitResultsExample {
  readonly collection = signal<ListCollection<City>>(createListCollection<City>({ items: cities.slice(0, LIMIT) }))

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const query = details.inputValue.toLowerCase()
    const filtered = cities.filter((item) => item.label.toLowerCase().includes(query)).slice(0, LIMIT)
    this.collection.set(createListCollection<City>({ items: filtered }))
  }
}
