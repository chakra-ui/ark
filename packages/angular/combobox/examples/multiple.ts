import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
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
  type ComboboxValueChangeDetails,
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface Skill {
  label: string
  value: string
}

const initialItems: Skill[] = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'python' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'Java', value: 'java' },
]

@Component({
  selector: 'combobox-multiple-example',
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
      [multiple]="true"
      [(value)]="selected"
      (inputValueChange)="onInputValueChange($event)"
      (valueChange)="onValueChange($event)"
    >
      <span arkComboboxLabel>Skills</span>
      <div class="combobox-tags">
        @if (selectedItems().length === 0) {
          <span class="combobox-tag-placeholder">None selected</span>
        }
        @for (item of selectedItems(); track item.value) {
          <span class="combobox-tag">{{ item.label }}</span>
        }
      </div>
      <div arkComboboxControl>
        <input arkComboboxInput placeholder="e.g. JavaScript" />
        <button arkComboboxTrigger>▾</button>
      </div>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkComboboxPositioner>
          <div arkComboboxContent>
            <div arkComboboxEmpty>No skills found</div>
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
export class ComboboxMultipleExample {
  readonly selected = signal<string[] | undefined>([])
  readonly collection = signal<ListCollection<Skill>>(createListCollection<Skill>({ items: initialItems }))

  readonly selectedItems = computed<Skill[]>(() => {
    const values = this.selected() ?? []
    return initialItems.filter((item) => values.includes(item.value))
  })

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const query = details.inputValue.toLowerCase()
    const selected = this.selected() ?? []
    const filtered = initialItems.filter(
      (item) => item.label.toLowerCase().includes(query) && !selected.includes(item.value),
    )
    this.collection.set(createListCollection<Skill>({ items: filtered }))
  }

  onValueChange(details: ComboboxValueChangeDetails<Skill>): void {
    const selected = details.value
    const filtered = this.collection().items.filter((item) => !selected.includes(item.value))
    this.collection.set(createListCollection<Skill>({ items: filtered }))
  }
}
