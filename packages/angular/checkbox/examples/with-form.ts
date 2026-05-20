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
  selector: 'checkbox-with-form-example',
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
    <form
      style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;"
      (submit)="onSubmit($event)"
    >
      <label arkCheckbox name="terms" value="accepted">
        <span arkCheckboxControl>
          <span arkCheckboxIndicator>
            <checkbox-check-icon />
          </span>
        </span>
        <span arkCheckboxLabel>I agree to the terms and conditions</span>
        <input arkCheckboxHiddenInput />
      </label>
      <button class="checkbox-demo-button" data-variant="solid" type="submit">Submit</button>
    </form>
  `,
  styles: [checkboxExampleStyles],
})
export class CheckboxWithFormExample {
  onSubmit(event: SubmitEvent): void {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    console.log('terms:', formData.get('terms'))
  }
}
