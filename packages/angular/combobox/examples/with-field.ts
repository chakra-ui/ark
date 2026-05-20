import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
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

interface Department {
  label: string
  value: string
}

const initialItems: Department[] = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'Finance', value: 'finance' },
]

@Component({
  selector: 'combobox-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldErrorText,
    ArkFieldHelperText,
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
    <div arkFieldRoot class="combobox-field-root">
      <div
        arkComboboxRoot
        #root="arkComboboxRoot"
        [collection]="collection()"
        (inputValueChange)="onInputValueChange($event)"
      >
        <span arkComboboxLabel>Department</span>
        <div arkComboboxControl>
          <input arkComboboxInput placeholder="e.g. Engineering" />
          <button arkComboboxClearTrigger>×</button>
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
      <span arkFieldHelperText class="combobox-field-helper">Select your primary department</span>
      <span arkFieldErrorText class="combobox-field-error">Department is required</span>
    </div>
  `,
  styles: [comboboxExampleStyles],
})
export class ComboboxWithFieldExample {
  readonly collection = signal<ListCollection<Department>>(createListCollection<Department>({ items: initialItems }))

  onInputValueChange(details: ComboboxInputValueChangeDetails): void {
    const query = details.inputValue.toLowerCase()
    const filtered = initialItems.filter((item) => item.label.toLowerCase().includes(query))
    this.collection.set(createListCollection<Department>({ items: filtered }))
  }
}
