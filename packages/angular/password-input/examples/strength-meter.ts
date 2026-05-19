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

type PasswordStrength = 'weak' | 'medium' | 'strong'

@Component({
  selector: 'password-input-strength-meter-example',
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
    <div arkPasswordInputRoot [(value)]="password">
      <span arkPasswordInputLabel>Password</span>
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
      @if (strength(); as value) {
        <div class="strength-meter">
          <div class="strength-bar">
            <div class="strength-fill" [attr.data-strength]="value"></div>
          </div>
          <div class="strength-label">{{ value }} password</div>
        </div>
      }
    </div>
  `,
  styles: [passwordInputExampleStyles],
})
export class PasswordInputStrengthMeterExample {
  readonly password = signal<string | undefined>('asdfasdf')
  readonly strength = computed<PasswordStrength | null>(() => {
    const password = this.password() ?? ''
    if (!password) return null
    const diversity =
      Number(/[a-z]/.test(password)) +
      Number(/[A-Z]/.test(password)) +
      Number(/\d/.test(password)) +
      Number(/[^A-Za-z0-9]/.test(password))
    if (diversity >= 4 && password.length >= 8) return 'strong'
    if (diversity >= 2 && password.length >= 6) return 'medium'
    return 'weak'
  })
}
