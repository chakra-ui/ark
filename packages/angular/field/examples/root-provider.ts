import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkFieldErrorText,
  ArkFieldHelperText,
  ArkFieldInput,
  ArkFieldLabel,
  ArkFieldRootProvider,
  useField,
} from '@ark-ui/angular/field'
import { fieldExampleStyles } from '../field-example-styles'

@Component({
  selector: 'field-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldRootProvider, ArkFieldLabel, ArkFieldInput, ArkFieldHelperText, ArkFieldErrorText],
  template: `
    <div class="vstack">
      <button type="button" (click)="toggleInvalid()">Toggle Invalid</button>
      <div arkFieldRootProvider [value]="field">
        <label arkFieldLabel>Label</label>
        <input arkFieldInput />
        <span arkFieldHelperText>Some additional Info</span>
        <span arkFieldErrorText>Error Info</span>
      </div>
    </div>
  `,
  styles: [fieldExampleStyles],
})
export class FieldRootProviderExample {
  readonly invalid = signal(false)
  readonly field = useField({ context: () => ({ invalid: this.invalid() }) })

  toggleInvalid() {
    this.invalid.update((v) => !v)
  }
}
