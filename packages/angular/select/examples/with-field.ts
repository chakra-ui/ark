import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
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

@Component({
  selector: 'select-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldErrorText,
    ArkFieldHelperText,
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
    <div arkFieldRoot>
      <div arkSelectRoot [collection]="collection">
        <span arkSelectLabel>Label</span>
        <div arkSelectControl>
          <button arkSelectTrigger>
            <span arkSelectValueText>Select a Framework</span>
            <span arkSelectIndicator>▾</span>
          </button>
        </div>
        <div arkSelectPositioner>
          <div arkSelectContent>
            @for (item of collection.items; track item) {
              <div arkSelectItem [item]="item">
                <span arkSelectItemText>{{ item }}</span>
                <span arkSelectItemIndicator>✓</span>
              }
            }
          </div>
        </div>
        <select arkSelectHiddenSelect></select>
      </div>
      <span arkFieldHelperText>Additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [selectExampleStyles],
})
export class SelectWithFieldExample {
  readonly collection: ListCollection<string> = createListCollection<string>({
    items: ['React', 'Solid', 'Vue', 'Svelte'],
  })
}
