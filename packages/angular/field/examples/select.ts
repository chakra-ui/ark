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
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
      </select>
      <span arkFieldHelperText>Choose one</span>
      <span arkFieldErrorText>Selection required</span>
    </div>
  `,
  styles: [fieldExampleStyles],
})
export class FieldSelectExample {}
