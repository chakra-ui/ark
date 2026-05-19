import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import {
  ArkPasswordInputControl,
  ArkPasswordInputIndicator,
  ArkPasswordInputInput,
  ArkPasswordInputLabel,
  ArkPasswordInputRoot,
  ArkPasswordInputVisibilityTrigger,
} from '@ark-ui/angular/password-input'
import { passwordInputExampleStyles } from '../password-input-example-styles'

@Component({
  selector: 'password-input-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldErrorText,
    ArkFieldHelperText,
    ArkPasswordInputRoot,
    ArkPasswordInputLabel,
    ArkPasswordInputControl,
    ArkPasswordInputInput,
    ArkPasswordInputVisibilityTrigger,
    ArkPasswordInputIndicator,
  ],
  template: `
    <div arkFieldRoot [invalid]="true">
      <div arkPasswordInputRoot>
        <span arkPasswordInputLabel>Password</span>
        <div arkPasswordInputControl>
          <input arkPasswordInputInput />
          <button arkPasswordInputVisibilityTrigger>
            <span arkPasswordInputIndicator>Toggle</span>
          </button>
        </div>
      </div>
      <span arkFieldHelperText>Enter your password</span>
      <span arkFieldErrorText>Password is required</span>
    </div>
  `,
  styles: [passwordInputExampleStyles],
})
export class PasswordInputWithFieldExample {}
