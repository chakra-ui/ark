import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldInput, ArkFieldLabel, ArkFieldRequiredIndicator, ArkFieldRoot } from '@ark-ui/angular/field'
import { fieldExampleStyles } from '../field-example-styles'

@Component({
  selector: 'field-required-indicator-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldRoot, ArkFieldLabel, ArkFieldRequiredIndicator, ArkFieldInput],
  template: `
    <div arkFieldRoot [required]="true">
      <label arkFieldLabel>
        Username
        <span arkFieldRequiredIndicator>*</span>
      </label>
      <input arkFieldInput />
    </div>
  `,
  styles: [fieldExampleStyles],
})
export class FieldRequiredIndicatorExample {}
