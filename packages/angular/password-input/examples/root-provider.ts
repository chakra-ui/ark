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
  ],
  template: `
    <div arkPasswordInputRootProvider [value]="passwordInput">
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
export class PasswordInputRootProviderExample {
  readonly passwordInput = usePasswordInput({ context: () => ({}) })
}
