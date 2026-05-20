import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import {
  ArkCheckboxControl,
  ArkCheckboxHiddenInput,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxRoot,
} from '../public-api'
import { fieldExampleStyles } from '../../field/field-example-styles'
import { checkboxExampleStyles } from '../checkbox-example-styles'
import { CheckboxCheckIcon, CheckboxMinusIcon } from './icons'

@Component({
  selector: 'checkbox-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldHelperText,
    ArkFieldErrorText,
    ArkCheckboxRoot,
    ArkCheckboxControl,
    ArkCheckboxIndicator,
    ArkCheckboxLabel,
    ArkCheckboxHiddenInput,
    CheckboxCheckIcon,
    CheckboxMinusIcon,
  ],
  template: `
    <div arkFieldRoot data-inline>
      <label arkCheckbox>
        <span arkCheckboxControl>
          <span arkCheckboxIndicator>
            <checkbox-check-icon />
          </span>
          <span arkCheckboxIndicator indeterminate>
            <checkbox-minus-icon />
          </span>
        </span>
        <span arkCheckboxLabel>Label</span>
        <input arkCheckboxHiddenInput />
      </label>
      <span arkFieldHelperText>Additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [fieldExampleStyles, checkboxExampleStyles],
})
export class CheckboxWithFieldExample {}
