import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkListboxContent,
  ArkListboxItem,
  ArkListboxItemIndicator,
  ArkListboxItemText,
  ArkListboxLabel,
  ArkListboxRoot,
} from '@ark-ui/angular/listbox'
import { listboxExampleStyles } from '../listbox-example-styles'

interface Option {
  label: string
  value: string
}

@Component({
  selector: 'listbox-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldErrorText,
    ArkFieldHelperText,
    ArkListboxRoot,
    ArkListboxLabel,
    ArkListboxContent,
    ArkListboxItem,
    ArkListboxItemText,
    ArkListboxItemIndicator,
  ],
  template: `
    <div arkFieldRoot [invalid]="true">
      <div arkListboxRoot [collection]="collection">
        <span arkListboxLabel>Color</span>
        <div arkListboxContent>
          @for (item of collection.items; track item.value) {
            <div arkListboxItem [item]="item">
              <span arkListboxItemText>{{ item.label }}</span>
              <span arkListboxItemIndicator>✓</span>
            </div>
          }
        </div>
      </div>
      <span arkFieldHelperText>Pick a color</span>
      <span arkFieldErrorText>Selection required</span>
    </div>
  `,
  styles: [listboxExampleStyles],
})
export class ListboxWithFieldExample {
  readonly collection: ListCollection<Option> = createListCollection<Option>({
    items: [
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
    ],
  })
}
