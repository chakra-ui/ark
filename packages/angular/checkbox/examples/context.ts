import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCheckboxContext,
  ArkCheckboxControl,
  ArkCheckboxHiddenInput,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxRoot,
} from '../public-api'
import { checkboxExampleStyles } from '../checkbox-example-styles'
import { CheckboxCheckIcon } from './icons'

@Component({
  selector: 'checkbox-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCheckboxRoot,
    ArkCheckboxControl,
    ArkCheckboxIndicator,
    ArkCheckboxLabel,
    ArkCheckboxHiddenInput,
    ArkCheckboxContext,
    CheckboxCheckIcon,
  ],
  template: `
    <label arkCheckbox>
      <span arkCheckboxControl>
        <span arkCheckboxIndicator>
          <checkbox-check-icon />
        </span>
      </span>
      <ng-template arkCheckboxContext let-checkbox="api">
        <span arkCheckboxLabel>Checked: {{ String(checkbox().checked) }}</span>
      </ng-template>
      <input arkCheckboxHiddenInput />
    </label>
  `,
  styles: [checkboxExampleStyles],
})
export class CheckboxContextExample {
  protected readonly String = String
}
