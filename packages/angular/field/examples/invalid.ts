import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFieldErrorText,
  ArkFieldHelperText,
  ArkFieldInput,
  ArkFieldLabel,
  ArkFieldRoot,
} from '@ark-ui/angular/field'
import { fieldExampleStyles } from '../field-example-styles'

@Component({
  selector: 'field-invalid-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldRoot, ArkFieldLabel, ArkFieldInput, ArkFieldHelperText, ArkFieldErrorText],
  template: `
    <div arkFieldRoot [invalid]="true">
      <label arkFieldLabel>Email</label>
      <input arkFieldInput placeholder="me@example.com" />
      <span arkFieldErrorText>This is an error text</span>
    </div>
  `,
  styles: [fieldExampleStyles],
})
export class FieldInvalidExample {}
