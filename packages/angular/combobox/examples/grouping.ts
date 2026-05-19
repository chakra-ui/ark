import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkComboboxClearTrigger,
  ArkComboboxContent,
  ArkComboboxControl,
  ArkComboboxInput,
  ArkComboboxItem,
  ArkComboboxItemGroup,
  ArkComboboxItemGroupLabel,
  ArkComboboxItemIndicator,
  ArkComboboxItemText,
  ArkComboboxLabel,
  ArkComboboxPositioner,
  ArkComboboxRoot,
  ArkComboboxTrigger,
  type ComboboxInputValueChangeDetails,
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface Country {
  label: string
  value: string
  continent: string
}

const initialItems: Country[] = [
  { label: 'Canada', value: 'ca', continent: 'North America' },
  { label: 'United States', value: 'us', continent: 'North America' },
  { label: 'Mexico', value: 'mx', continent: 'North America' },
  { label: 'United Kingdom', value: 'uk', continent: 'Europe' },
  { label: 'Germany', value: 'de', continent: 'Europe' },
  { label: 'France', value: 'fr', continent: 'Europe' },
  { label: 'Japan', value: 'jp', continent: 'Asia' },
  { label: 'South Korea', value: 'kr', continent: 'Asia' },
  { label: 'China', value: 'cn', continent: 'Asia' },
]

const buildCollection = (items: Country[]): ListCollection<Country> =>
  createListCollection<Country>({ items, groupBy: (item) => item.continent })

@Component({
  selector: 'combobox-grouping-example',
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
    ArkComboboxItemGroup,
    ArkComboboxItemGroupLabel,
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
      <span arkComboboxLabel>Country</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. Canada" />
        <button arkComboboxClearTrigger>×</button>
        <button arkComboboxTrigger>▾</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            @for (group of collection().group(); track group[0]) {
              <div arkComboboxItemGroup>
                <div arkComboboxItemGroupLabel>{{ group[0] }}</div>
                @for (item of group[1]; track item.value) {
                  <div arkComboboxItem [item]="item">
                    <span arkComboboxItemText>{{ item.label }}</span>
                    <span arkComboboxItemIndicator>✓</span>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [comboboxExampleStyles],
})
export class ComboboxGroupingExample {
  readonly collection = signal<ListCollection<Country>>(buildCollection(initialItems))

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const query = details.inputValue.toLowerCase()
    const filtered = initialItems.filter((item) => item.label.toLowerCase().includes(query))
    this.collection.set(buildCollection(filtered))
  }
}
