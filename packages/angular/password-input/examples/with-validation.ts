import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
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
  selector: 'password-input-with-validation-example',
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
    <div arkPasswordInputRoot [(value)]="password" [invalid]="!isValid() && passwordLength() > 0">
      <span arkPasswordInputLabel>Password (min 8 characters)</span>
      <div arkPasswordInputControl>
        <input arkPasswordInputInput placeholder="Enter your password" />
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
      @if (passwordLength() > 0 && !isValid()) {
        <p class="validation-message" data-valid="false">Password must be at least 8 characters</p>
      }
      @if (passwordLength() > 0 && isValid()) {
        <p class="validation-message" data-valid="true">Password is valid</p>
      }
    </div>
  `,
  styles: [passwordInputExampleStyles],
})
export class PasswordInputWithValidationExample {
  readonly password = signal<string | undefined>('')
  readonly passwordLength = computed(() => (this.password() ?? '').length)
  readonly isValid = computed(() => this.passwordLength() >= 8)
}
