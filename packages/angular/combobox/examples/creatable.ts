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
  type ComboboxOpenChangeDetails,
  type ComboboxValueChangeDetails,
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface Item {
  label: string
  value: string
  __new__?: boolean
}

const NEW_OPTION_VALUE = '[[new]]'
const initialItems: Item[] = [
  { label: 'Bug', value: 'bug' },
  { label: 'Feature', value: 'feature' },
  { label: 'Enhancement', value: 'enhancement' },
  { label: 'Documentation', value: 'docs' },
]

const createNewOption = (value: string): Item => ({ label: value, value: NEW_OPTION_VALUE })
const getNewOptionData = (inputValue: string): Item => ({ label: inputValue, value: inputValue, __new__: true })
const isNewOptionValue = (value: string) => value === NEW_OPTION_VALUE
const replaceNewOptionValue = (values: string[], value: string) =>
  values.map((currentValue) => (currentValue === NEW_OPTION_VALUE ? value : currentValue))

@Component({
  selector: 'combobox-creatable-example',
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
      [value]="selectedValue()"
      allowCustomValue
      (inputValueChange)="onInputValueChange($event)"
      (openChange)="onOpenChange($event)"
      (valueChange)="onValueChange($event)"
    >
      <span arkComboboxLabel>Label</span>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. Bug" />
        <button arkComboboxClearTrigger>×</button>
        <button arkComboboxTrigger>▾</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            @for (item of collection().items; track item.value) {
              <div arkComboboxItem [item]="item">
                @if (isNewOptionValue(item.value)) {
                  <span arkComboboxItemText>+ Create "{{ item.label }}"</span>
                } @else {
                  <span arkComboboxItemText>{{ item.label }} {{ item.__new__ ? '(new)' : '' }}</span>
                }
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
export class ComboboxCreatableExample {
  readonly selectedValue = signal<string[]>([])
  readonly inputValue = signal('')
  readonly items = signal<Item[]>(initialItems)
  readonly collection = computed<ListCollection<Item>>(() => createListCollection<Item>({ items: this.items() }))

  protected readonly isNewOptionValue = isNewOptionValue

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const inputValue = details.inputValue
    if (details.reason === 'input-change' || details.reason === 'item-select') {
      this.filterItems(inputValue)
    }
    this.inputValue.set(inputValue)
  }

  onOpenChange(details: ComboboxOpenChangeDetails): void {
    if (details.reason === 'trigger-click') {
      this.filterItems('')
    }
  }

  onValueChange(details: ComboboxValueChangeDetails<Item>): void {
    const inputValue = this.inputValue()
    this.selectedValue.set(replaceNewOptionValue(details.value, inputValue))

    if (details.value.includes(NEW_OPTION_VALUE)) {
      this.items.set([...initialItems, getNewOptionData(inputValue)])
      console.log('New Option Created', inputValue)
    }
  }

  private filterItems(inputValue: string): void {
    const query = inputValue.toLowerCase()
    const createdItems = this.items().filter((item) => item.__new__)
    const sourceItems = [...initialItems, ...createdItems]
    const filtered = sourceItems.filter((item) => item.label.toLowerCase().includes(query))
    const exactOptionMatch = sourceItems.some((item) => item.label.toLowerCase() === query)
    const items =
      !exactOptionMatch && inputValue.trim().length > 0 ? [...filtered, createNewOption(inputValue)] : filtered
    this.items.set(items)
  }
}
