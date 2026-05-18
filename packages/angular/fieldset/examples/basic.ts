import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldInput, ArkFieldLabel, ArkFieldRoot } from '@ark-ui/angular/field'
import { ArkFieldsetLegend, ArkFieldsetRoot } from '@ark-ui/angular/fieldset'
import { fieldsetExampleStyles } from '../fieldset-example-styles'

@Component({
  selector: 'fieldset-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldsetRoot, ArkFieldsetLegend, ArkFieldRoot, ArkFieldLabel, ArkFieldInput],
  template: `
    <fieldset arkFieldsetRoot>
      <legend arkFieldsetLegend>Contact Details</legend>
      <div arkFieldRoot>
        <label arkFieldLabel>Name</label>
        <input arkFieldInput placeholder="John Doe" />
      </div>
      <div arkFieldRoot>
        <label arkFieldLabel>Email</label>
        <input arkFieldInput type="email" placeholder="john@example.com" />
      </div>
    </fieldset>
  `,
  styles: [fieldsetExampleStyles],
})
export class FieldsetBasicExample {}
