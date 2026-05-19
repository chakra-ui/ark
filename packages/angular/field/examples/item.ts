import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFieldErrorText,
  ArkFieldHelperText,
  ArkFieldInput,
  ArkFieldItem,
  ArkFieldLabel,
  ArkFieldRoot,
  ArkFieldSelect,
} from '@ark-ui/angular/field'
import { fieldExampleStyles } from '../field-example-styles'

@Component({
  selector: 'field-item-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldLabel,
    ArkFieldItem,
    ArkFieldInput,
    ArkFieldSelect,
    ArkFieldHelperText,
    ArkFieldErrorText,
  ],
  template: `
    <div arkFieldRoot target="amount">
      <label arkFieldLabel>Amount</label>
      <div arkFieldItem value="currency">
        <select arkFieldSelect>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div arkFieldItem value="amount">
        <input arkFieldInput />
      </div>
      <span arkFieldHelperText>Enter the amount</span>
      <span arkFieldErrorText>Invalid amount</span>
    </div>
  `,
  styles: [fieldExampleStyles],
})
export class FieldItemExample {}
