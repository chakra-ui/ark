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
  { label: 'Svelte', value: 'svelte' },
]

@Component({
  selector: 'checkbox-group-with-max-selected-example',
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
    <div arkCheckboxGroup [defaultValue]="['react']" [maxSelectedValues]="2" name="framework">
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
export class CheckboxGroupWithMaxSelectedExample {
  protected readonly items = items
}
