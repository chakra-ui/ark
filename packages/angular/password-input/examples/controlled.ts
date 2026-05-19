import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkPasswordInputControl,
  ArkPasswordInputIndicator,
  ArkPasswordInputInput,
  ArkPasswordInputLabel,
  ArkPasswordInputRoot,
  ArkPasswordInputVisibilityTrigger,
} from '@ark-ui/angular/password-input'
import { passwordInputExampleStyles } from '../password-input-example-styles'
import { PasswordInputEyeIcon, PasswordInputEyeOffIcon } from './icons'

@Component({
  selector: 'password-input-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPasswordInputRoot,
    ArkPasswordInputLabel,
    ArkPasswordInputControl,
    ArkPasswordInputInput,
    ArkPasswordInputVisibilityTrigger,
    ArkPasswordInputIndicator,
    PasswordInputEyeIcon,
    PasswordInputEyeOffIcon,
  ],
  template: `
    <div arkPasswordInputRoot [(visible)]="visible">
      <span arkPasswordInputLabel>Password is {{ visible() ? 'visible' : 'hidden' }}</span>
      <div arkPasswordInputControl>
        <input arkPasswordInputInput />
        <button arkPasswordInputVisibilityTrigger>
          <span arkPasswordInputIndicator #indicator="arkPasswordInputIndicator">
            @if (indicator.visible()) {
              <password-input-eye-icon />
            } @else {
              <password-input-eye-off-icon />
            }
          </span>
        </button>
      </div>
    </div>
  `,
  styles: [passwordInputExampleStyles],
})
export class PasswordInputControlledExample {
  readonly visible = signal<boolean | undefined>(false)
}
