import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCheckboxControl,
  ArkCheckboxHiddenInput,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxRootProvider,
  useCheckbox,
} from '../public-api'
import { checkboxExampleStyles } from '../checkbox-example-styles'
import { CheckboxCheckIcon } from './icons'

@Component({
  selector: 'checkbox-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCheckboxRootProvider,
    ArkCheckboxControl,
    ArkCheckboxIndicator,
    ArkCheckboxLabel,
    ArkCheckboxHiddenInput,
    CheckboxCheckIcon,
  ],
  template: `
    <div class="vstack">
      <label arkCheckboxRootProvider [value]="checkbox">
        <span arkCheckboxControl>
          <span arkCheckboxIndicator>
            <checkbox-check-icon />
          </span>
        </span>
        <span arkCheckboxLabel>Checkbox</span>
        <input arkCheckboxHiddenInput />
      </label>

      @if (checkbox.api().checked) {
        <button type="button" (click)="checkbox.api().setChecked(false)" class="checkbox-demo-button">Uncheck</button>
      } @else {
        <button type="button" (click)="checkbox.api().setChecked(true)" class="checkbox-demo-button">Check</button>
      }
    </div>
  `,
  styles: [checkboxExampleStyles],
})
export class CheckboxRootProviderExample {
  readonly checkbox = useCheckbox()
}
