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
  selector: 'field-disabled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldRoot, ArkFieldLabel, ArkFieldInput, ArkFieldHelperText, ArkFieldErrorText],
  template: `
    <div arkFieldRoot [disabled]="true">
      <label arkFieldLabel>Label</label>
      <input arkFieldInput />
      <span arkFieldHelperText>Some additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [fieldExampleStyles],
})
export class FieldDisabledExample {}
