import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
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
} from '@ark-ui/angular/combobox'
import { comboboxExampleStyles } from '../combobox-example-styles'

interface Department {
  label: string
  value: string
}

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
    ArkComboboxTrigger,
    ArkComboboxPositioner,
    ArkComboboxContent,
    ArkComboboxItem,
    ArkComboboxItemText,
    ArkComboboxItemIndicator,
  ],
  template: `
    <div arkFieldRoot [invalid]="true">
      <div arkComboboxRoot #root="arkComboboxRoot" [collection]="collection">
        <span arkComboboxLabel>Department</span>
        <div arkComboboxControl>
          <input arkComboboxInput placeholder="e.g. Engineering" />
          <button arkComboboxTrigger>▾</button>
        </div>
        <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
          <div arkComboboxPositioner>
            <div arkComboboxContent>
              @for (item of collection.items; track item.value) {
                <div arkComboboxItem [item]="item">
                  <span arkComboboxItemText>{{ item.label }}</span>
                  <span arkComboboxItemIndicator>✓</span>
                </div>
              }
            </div>
          </div>
        </ark-portal>
      </div>
      <span arkFieldHelperText>Pick your department</span>
      <span arkFieldErrorText>Department is required</span>
    </div>
  `,
  styles: [comboboxExampleStyles],
})
export class ComboboxWithFieldExample {
  readonly collection: ListCollection<Department> = createListCollection<Department>({
    items: [
      { label: 'Engineering', value: 'engineering' },
      { label: 'Design', value: 'design' },
      { label: 'Marketing', value: 'marketing' },
      { label: 'Sales', value: 'sales' },
      { label: 'Human Resources', value: 'hr' },
      { label: 'Finance', value: 'finance' },
    ],
  })
}
