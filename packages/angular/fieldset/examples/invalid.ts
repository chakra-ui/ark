import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldInput, ArkFieldLabel, ArkFieldRoot } from '@ark-ui/angular/field'
import { ArkFieldsetErrorText, ArkFieldsetLegend, ArkFieldsetRoot } from '@ark-ui/angular/fieldset'
import { fieldsetExampleStyles } from '../fieldset-example-styles'

@Component({
  selector: 'fieldset-invalid-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldsetRoot,
    ArkFieldsetLegend,
    ArkFieldsetErrorText,
    ArkFieldRoot,
    ArkFieldLabel,
    ArkFieldInput,
    ArkFieldErrorText,
  ],
  template: `
    <fieldset arkFieldsetRoot [invalid]="true">
      <legend arkFieldsetLegend>Account Information</legend>
      <span arkFieldsetErrorText>Please fix the errors below to continue.</span>
      <div arkFieldRoot [invalid]="true">
        <label arkFieldLabel>Username</label>
        <input arkFieldInput value="jo" />
        <span arkFieldErrorText>Username must be at least 3 characters</span>
      </div>
      <div arkFieldRoot [invalid]="true">
        <label arkFieldLabel>Email</label>
        <input arkFieldInput type="email" value="invalid-email" />
        <span arkFieldErrorText>Please enter a valid email address</span>
      </div>
    </fieldset>
  `,
  styles: [fieldsetExampleStyles],
})
export class FieldsetInvalidExample {}
