import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFieldErrorText,
  ArkFieldHelperText,
  ArkFieldLabel,
  ArkFieldRootProvider,
  useField,
} from '@ark-ui/angular/field'
import { ArkPropsDirective } from '../../src/ark-props'
import { fieldExampleStyles } from '../field-example-styles'

@Component({
  selector: 'field-custom-control-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkPropsDirective, ArkFieldRootProvider, ArkFieldLabel, ArkFieldHelperText, ArkFieldErrorText],
  template: `
    <div arkFieldRootProvider [value]="field">
      <label arkFieldLabel>Any Control</label>
      <input [arkProps]="field.getInputProps()" />
      <span arkFieldHelperText>Uses getInputProps() for maximum flexibility</span>
      <span arkFieldErrorText>This field has an error</span>
    </div>
  `,
  styles: [fieldExampleStyles],
})
export class FieldCustomControlExample {
  readonly field = useField({ context: () => ({ invalid: true }) })
}
