import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCheckboxControl,
  ArkCheckboxGroupProvider,
  ArkCheckboxHiddenInput,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxRoot,
  useCheckboxGroup,
} from '../public-api'
import { checkboxExampleStyles } from '../checkbox-example-styles'
import { CheckboxCheckIcon } from './icons'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

@Component({
  selector: 'checkbox-group-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCheckboxGroupProvider,
    ArkCheckboxRoot,
    ArkCheckboxControl,
    ArkCheckboxIndicator,
    ArkCheckboxLabel,
    ArkCheckboxHiddenInput,
    CheckboxCheckIcon,
  ],
  template: `
    <div arkCheckboxGroupProvider [value]="group">
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
export class CheckboxGroupProviderExample {
  readonly group = useCheckboxGroup({
    context: () => ({
      defaultValue: ['react'],
      name: 'framework',
    }),
  })
  protected readonly items = items
}
