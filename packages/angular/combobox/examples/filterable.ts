import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkComboboxClearTrigger,
  ArkComboboxContent,
  ArkComboboxControl,
  ArkComboboxEmpty,
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

interface Fruit {
  label: string
  value: string
}

const initialItems: Fruit[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Mango', value: 'mango' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
]

@Component({
  selector: 'combobox-filterable-example',
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
    ArkComboboxEmpty,
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
      <span arkComboboxLabel>Fruit</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="Type to filter" />
        <button arkComboboxClearTrigger>×</button>
        <button arkComboboxTrigger>▾</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            <div arkComboboxEmpty>No fruits found</div>
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
export class ComboboxFilterableExample {
  readonly collection = signal<ListCollection<Fruit>>(createListCollection<Fruit>({ items: initialItems }))

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const query = details.inputValue.toLowerCase()
    const filtered = initialItems.filter((item) => item.label.toLowerCase().includes(query))
    this.collection.set(createListCollection<Fruit>({ items: filtered }))
  }
}
