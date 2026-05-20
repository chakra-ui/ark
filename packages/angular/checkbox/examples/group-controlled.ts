import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  selector: 'checkbox-group-controlled-example',
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
    <div class="vstack">
      <output>value: {{ json(value()) }}</output>
      <div arkCheckboxGroup [(value)]="value" name="framework">
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
    </div>
  `,
  styles: [checkboxExampleStyles],
})
export class CheckboxGroupControlledExample {
  readonly value = signal<string[] | undefined>(['react'])
  protected readonly items = items
  protected readonly json = JSON.stringify
}
