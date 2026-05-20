import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import type { CheckboxCheckedState } from '../public-api'
import {
  ArkCheckboxControl,
  ArkCheckboxHiddenInput,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxRoot,
} from '../public-api'
import { checkboxExampleStyles } from '../checkbox-example-styles'
import { CheckboxCheckIcon } from './icons'

@Component({
  selector: 'checkbox-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCheckboxRoot,
    ArkCheckboxControl,
    ArkCheckboxIndicator,
    ArkCheckboxLabel,
    ArkCheckboxHiddenInput,
    CheckboxCheckIcon,
  ],
  template: `
    <label arkCheckbox [(checked)]="checked">
      <span arkCheckboxControl>
        <span arkCheckboxIndicator>
          <checkbox-check-icon />
        </span>
      </span>
      <span arkCheckboxLabel>Checkbox</span>
      <input arkCheckboxHiddenInput />
    </label>
  `,
  styles: [checkboxExampleStyles],
})
export class CheckboxControlledExample {
  readonly checked = signal<CheckboxCheckedState | undefined>(true)
}
