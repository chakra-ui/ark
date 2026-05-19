import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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

interface Country {
  country: string
  code: string
  flag: string
}

const initialItems: Country[] = [
  { country: 'United States', code: 'US', flag: '🇺🇸' },
  { country: 'Canada', code: 'CA', flag: '🇨🇦' },
  { country: 'Australia', code: 'AU', flag: '🇦🇺' },
]

const buildCollection = (items: Country[]): ListCollection<Country> =>
  createListCollection<Country>({
    items,
    itemToString: (item) => item.country,
    itemToValue: (item) => item.code,
  })

@Component({
  selector: 'combobox-custom-object-example',
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
      <span arkComboboxLabel>Country</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. Canada" />
        <button arkComboboxClearTrigger>×</button>
        <button arkComboboxTrigger>▾</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            @for (item of collection().items; track item.code) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.flag }} {{ item.country }}</span>
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
export class ComboboxCustomObjectExample {
  readonly collection = signal<ListCollection<Country>>(buildCollection(initialItems))

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const query = details.inputValue.toLowerCase()
    const filtered = initialItems.filter((item) => item.country.toLowerCase().includes(query))
    this.collection.set(buildCollection(filtered))
  }
}
