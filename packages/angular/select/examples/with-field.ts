import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkSelectContent,
  ArkSelectControl,
  ArkSelectHiddenSelect,
  ArkSelectItem,
  ArkSelectItemIndicator,
  ArkSelectItemText,
  ArkSelectLabel,
  ArkSelectPositioner,
  ArkSelectRoot,
  ArkSelectTrigger,
  ArkSelectValueText,
} from '@ark-ui/angular/select'
import { selectExampleStyles } from '../select-example-styles'

interface Option {
  label: string
  value: string
}

@Component({
  selector: 'select-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldErrorText,
    ArkFieldHelperText,
    ArkPortalComponent,
    ArkSelectRoot,
    ArkSelectLabel,
    ArkSelectControl,
    ArkSelectTrigger,
    ArkSelectValueText,
    ArkSelectPositioner,
    ArkSelectContent,
    ArkSelectItem,
    ArkSelectItemText,
    ArkSelectItemIndicator,
    ArkSelectHiddenSelect,
  ],
  template: `
    <div arkFieldRoot [invalid]="true">
      <div arkSelectRoot #root="arkSelectRoot" [collection]="collection">
        <span arkSelectLabel>Color</span>
        <div arkSelectControl>
          <button arkSelectTrigger>
            <span arkSelectValueText>Pick a color</span>
          </button>
        </div>
        <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
          <div arkSelectPositioner>
            <div arkSelectContent>
              @for (item of collection.items; track item.value) {
                <div arkSelectItem [item]="item">
                  <span arkSelectItemText>{{ item.label }}</span>
                  <span arkSelectItemIndicator>✓</span>
                </div>
              }
            </div>
          </div>
        </ark-portal>
        <select arkSelectHiddenSelect></select>
      </div>
      <span arkFieldHelperText>Pick a color</span>
      <span arkFieldErrorText>Selection required</span>
    </div>
  `,
  styles: [selectExampleStyles],
})
export class SelectWithFieldExample {
  readonly collection: ListCollection<Option> = createListCollection<Option>({
    items: [
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
    ],
  })
}
