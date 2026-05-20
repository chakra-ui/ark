import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCheckboxControl,
  ArkCheckboxHiddenInput,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxRoot,
} from '../public-api'
import { checkboxExampleStyles } from '../checkbox-example-styles'
import { CheckboxCheckIcon, CheckboxMinusIcon } from './icons'

@Component({
  selector: 'checkbox-indeterminate-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCheckboxRoot,
    ArkCheckboxControl,
    ArkCheckboxIndicator,
    ArkCheckboxLabel,
    ArkCheckboxHiddenInput,
    CheckboxCheckIcon,
    CheckboxMinusIcon,
  ],
  template: `
    <label arkCheckbox [checked]="'indeterminate'">
      <span arkCheckboxControl>
        <span arkCheckboxIndicator>
          <checkbox-check-icon />
        </span>
        <span arkCheckboxIndicator indeterminate>
          <checkbox-minus-icon />
        </span>
      </span>
      <span arkCheckboxLabel>Checkbox</span>
      <input arkCheckboxHiddenInput />
    </label>
  `,
  styles: [checkboxExampleStyles],
})
export class CheckboxIndeterminateExample {}
