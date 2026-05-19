import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  selector: 'password-input-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPasswordInputRoot,
    ArkPasswordInputLabel,
    ArkPasswordInputControl,
    ArkPasswordInputInput,
    ArkPasswordInputVisibilityTrigger,
    ArkPasswordInputIndicator,
  ],
  template: `
    <div arkPasswordInputRoot>
      <span arkPasswordInputLabel>Password</span>
      <div arkPasswordInputControl>
        <input arkPasswordInputInput />
        <button arkPasswordInputVisibilityTrigger>
          <span arkPasswordInputIndicator>Toggle</span>
        </button>
      </div>
    </div>
  `,
  styles: [passwordInputExampleStyles],
})
export class PasswordInputBasicExample {}
