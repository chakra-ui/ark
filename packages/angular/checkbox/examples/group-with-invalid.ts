import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCheckboxControl,
  ArkCheckboxGroup,
  ArkCheckboxHiddenInput,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxRoot,
} from '../public-api'
import { checkboxExampleStyles } from '../checkbox-example-styles'
import { CheckboxCheckIcon } from './icons'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

@Component({
  selector: 'checkbox-group-with-invalid-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCheckboxGroup,
    ArkCheckboxRoot,
    ArkCheckboxControl,
    ArkCheckboxIndicator,
    ArkCheckboxLabel,
    ArkCheckboxHiddenInput,
    CheckboxCheckIcon,
  ],
  template: `
    <div arkCheckboxGroup invalid>
      @for (item of items; track item.value) {
        <label arkCheckbox [value]="item.value">
          <span arkCheckboxControl>
            <span arkCheckboxIndicator>
              <checkbox-check-icon />
            </span>
          </span>
          <span arkCheckboxLabel>{{ item.label }}</span>
          <input arkCheckboxHiddenInput />
        </label>
      }
    </div>
  `,
  styles: [checkboxExampleStyles],
})
export class CheckboxGroupWithInvalidExample {
  protected readonly items = items
}
