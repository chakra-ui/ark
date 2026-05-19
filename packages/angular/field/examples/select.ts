import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFieldErrorText,
  ArkFieldHelperText,
  ArkFieldLabel,
  ArkFieldRoot,
  ArkFieldSelect,
} from '@ark-ui/angular/field'
import { fieldExampleStyles } from '../field-example-styles'

@Component({
  selector: 'field-select-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldRoot, ArkFieldLabel, ArkFieldSelect, ArkFieldHelperText, ArkFieldErrorText],
  template: `
    <div arkFieldRoot>
      <label arkFieldLabel>Label</label>
      <select arkFieldSelect>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
      <span arkFieldHelperText>Some additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [fieldExampleStyles],
})
export class FieldSelectExample {}
