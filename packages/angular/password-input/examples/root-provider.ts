import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkPasswordInputControl,
  ArkPasswordInputIndicator,
  ArkPasswordInputInput,
  ArkPasswordInputLabel,
  ArkPasswordInputRootProvider,
  ArkPasswordInputVisibilityTrigger,
  usePasswordInput,
} from '@ark-ui/angular/password-input'
import { passwordInputExampleStyles } from '../password-input-example-styles'
import { PasswordInputEyeIcon, PasswordInputEyeOffIcon } from './icons'

@Component({
  selector: 'password-input-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkPasswordInputRootProvider,
    ArkPasswordInputLabel,
    ArkPasswordInputControl,
    ArkPasswordInputInput,
    ArkPasswordInputVisibilityTrigger,
    ArkPasswordInputIndicator,
    PasswordInputEyeIcon,
    PasswordInputEyeOffIcon,
  ],
  template: `
    <div class="stack">
      <output>password input is {{ passwordInput.api().visible ? 'visible' : 'hidden' }}</output>
      <div arkPasswordInputRootProvider [value]="passwordInput">
        <span arkPasswordInputLabel>Password</span>
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
    </div>
  `,
  styles: [passwordInputExampleStyles],
})
export class PasswordInputRootProviderExample {
  readonly passwordInput = usePasswordInput({ context: () => ({}) })
}
