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

interface SeaCreature {
  label: string
  value: string
}

const initialItems: SeaCreature[] = [
  { label: 'Whale', value: 'whale' },
  { label: 'Dolphin', value: 'dolphin' },
  { label: 'Shark', value: 'shark' },
  { label: 'Octopus', value: 'octopus' },
  { label: 'Jellyfish', value: 'jellyfish' },
  { label: 'Seahorse', value: 'seahorse' },
]

@Component({
  selector: 'combobox-inline-autocomplete-example',
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
      inputBehavior="autocomplete"
      (inputValueChange)="onInputValueChange($event)"
    >
      <span arkComboboxLabel>Sea Creature</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. Dolphin" />
        <button arkComboboxClearTrigger>×</button>
        <button arkComboboxTrigger>▾</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            <div arkComboboxEmpty>No results found</div>
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
export class ComboboxInlineAutocompleteExample {
  readonly collection = signal<ListCollection<SeaCreature>>(createListCollection<SeaCreature>({ items: initialItems }))

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const query = details.inputValue.toLowerCase()
    const filtered = initialItems.filter((item) => item.label.toLowerCase().startsWith(query))
    this.collection.set(createListCollection<SeaCreature>({ items: filtered }))
  }
}
