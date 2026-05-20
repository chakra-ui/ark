import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkHighlightComponent } from '@ark-ui/angular/highlight'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkComboboxClearTrigger,
  ArkComboboxContent,
  ArkComboboxControl,
  ArkComboboxInput,
  ArkComboboxItem,
  ArkComboboxItemText,
  ArkComboboxLabel,
  ArkComboboxPositioner,
  ArkComboboxRoot,
  ArkComboboxTrigger,
  type ComboboxInputValueChangeDetails,
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface Assignee {
  label: string
  value: string
}

const initialItems: Assignee[] = [
  { label: 'John Smith', value: 'john-smith' },
  { label: 'Jane Doe', value: 'jane-doe' },
  { label: 'Bob Johnson', value: 'bob-johnson' },
  { label: 'Alice Williams', value: 'alice-williams' },
  { label: 'Charlie Brown', value: 'charlie-brown' },
  { label: 'Diana Ross', value: 'diana-ross' },
]

@Component({
  selector: 'combobox-highlight-matching-text-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkHighlightComponent,
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
  ],
  template: `
    <div
      arkComboboxRoot
      #root="arkComboboxRoot"
      [collection]="collection()"
      (inputValueChange)="onInputValueChange($event)"
    >
      <span arkComboboxLabel>Assignee</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. John Smith" />
        <button arkComboboxClearTrigger>×</button>
        <button arkComboboxTrigger>▾</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            @for (item of collection().items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>
                  <ark-highlight [text]="item.label" [query]="root.api().inputValue" ignoreCase />
                </span>
              </div>
            }
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [comboboxExampleStyles],
})
export class ComboboxHighlightMatchingTextExample {
  readonly collection = signal<ListCollection<Assignee>>(createListCollection<Assignee>({ items: initialItems }))

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const query = details.inputValue.toLowerCase()
    const filtered = initialItems.filter((item) => item.label.toLowerCase().includes(query))
    this.collection.set(createListCollection<Assignee>({ items: filtered }))
  }
}
