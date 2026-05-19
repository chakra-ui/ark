import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldHelperText, ArkFieldInput, ArkFieldLabel, ArkFieldRoot } from '@ark-ui/angular/field'
import { ArkFieldsetLegend, ArkFieldsetRoot } from '@ark-ui/angular/fieldset'
import { fieldsetExampleStyles } from '../fieldset-example-styles'

@Component({
  selector: 'fieldset-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldsetRoot, ArkFieldsetLegend, ArkFieldRoot, ArkFieldLabel, ArkFieldInput, ArkFieldHelperText],
  template: `
    <fieldset arkFieldsetRoot>
      <legend arkFieldsetLegend>Personal Information</legend>
      <div arkFieldRoot>
        <label arkFieldLabel>First Name</label>
        <input arkFieldInput placeholder="Enter your first name" />
        <span arkFieldHelperText>As it appears on your ID</span>
      </div>
      <div arkFieldRoot>
        <label arkFieldLabel>Last Name</label>
        <input arkFieldInput placeholder="Enter your last name" />
      </div>
    </fieldset>
  `,
  styles: [fieldsetExampleStyles],
})
export class FieldsetWithFieldExample {}
