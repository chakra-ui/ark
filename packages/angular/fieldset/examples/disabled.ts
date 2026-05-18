import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldInput, ArkFieldLabel, ArkFieldRoot } from '@ark-ui/angular/field'
import { ArkFieldsetHelperText, ArkFieldsetLegend, ArkFieldsetRoot } from '@ark-ui/angular/fieldset'
import { fieldsetExampleStyles } from '../fieldset-example-styles'

@Component({
  selector: 'fieldset-disabled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldsetRoot, ArkFieldsetLegend, ArkFieldsetHelperText, ArkFieldRoot, ArkFieldLabel, ArkFieldInput],
  template: `
    <fieldset arkFieldsetRoot [disabled]="true">
      <legend arkFieldsetLegend>Shipping Address</legend>
      <span arkFieldsetHelperText>Your address cannot be changed after order confirmation.</span>
      <div arkFieldRoot>
        <label arkFieldLabel>Street</label>
        <input arkFieldInput value="123 Main St" />
      </div>
      <div arkFieldRoot>
        <label arkFieldLabel>City</label>
        <input arkFieldInput value="San Francisco" />
      </div>
    </fieldset>
  `,
  styles: [fieldsetExampleStyles],
})
export class FieldsetDisabledExample {}
