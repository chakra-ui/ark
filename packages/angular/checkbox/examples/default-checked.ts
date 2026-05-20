import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  selector: 'checkbox-default-checked-example',
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
    <label arkCheckbox defaultChecked>
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
export class CheckboxDefaultCheckedExample {}
