import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFieldErrorText,
  ArkFieldHelperText,
  ArkFieldLabel,
  ArkFieldRoot,
  ArkFieldTextarea,
} from '@ark-ui/angular/field'
import { fieldExampleStyles } from '../field-example-styles'

@Component({
  selector: 'field-textarea-autoresize-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldRoot, ArkFieldLabel, ArkFieldTextarea, ArkFieldHelperText, ArkFieldErrorText],
  template: `
    <div arkFieldRoot>
      <label arkFieldLabel>Label</label>
      <textarea arkFieldTextarea autoresize></textarea>
      <span arkFieldHelperText>Some additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [fieldExampleStyles],
})
export class FieldTextareaAutoresizeExample {}
