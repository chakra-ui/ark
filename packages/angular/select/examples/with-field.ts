import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ArkSelectContent,
  ArkSelectControl,
  ArkSelectHiddenSelect,
  ArkSelectIndicator,
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
    ArkSelectIndicator,
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
        <span arkSelectLabel>Label</span>
        <div arkSelectControl>
          <button arkSelectTrigger>
            <span arkSelectValueText>Select a framework</span>
            <span arkSelectIndicator>▾</span>
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
      <span arkFieldHelperText>Additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [selectExampleStyles],
})
export class SelectWithFieldExample {
  readonly collection: ListCollection<Option> = createListCollection<Option>({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' },
    ],
  })
}
