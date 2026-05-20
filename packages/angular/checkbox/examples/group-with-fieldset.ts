import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldsetHelperText, ArkFieldsetLegend, ArkFieldsetRoot } from '@ark-ui/angular/fieldset'
import {
  ArkCheckboxControl,
  ArkCheckboxGroup,
  ArkCheckboxHiddenInput,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxRoot,
} from '../public-api'
import { fieldsetExampleStyles } from '../../fieldset/fieldset-example-styles'
import { checkboxExampleStyles } from '../checkbox-example-styles'
import { CheckboxCheckIcon } from './icons'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

@Component({
  selector: 'checkbox-group-with-fieldset-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldsetRoot,
    ArkFieldsetLegend,
    ArkFieldsetHelperText,
    ArkCheckboxGroup,
    ArkCheckboxRoot,
    ArkCheckboxControl,
    ArkCheckboxIndicator,
    ArkCheckboxLabel,
    ArkCheckboxHiddenInput,
    CheckboxCheckIcon,
  ],
  template: `
    <fieldset arkFieldsetRoot>
      <legend arkFieldsetLegend>Select frameworks</legend>
      <span arkFieldsetHelperText>Choose your preferred frameworks</span>
      <div arkCheckboxGroup [defaultValue]="['react']" name="framework">
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
    </fieldset>
  `,
  styles: [fieldsetExampleStyles, checkboxExampleStyles],
})
export class CheckboxGroupWithFieldsetExample {
  protected readonly items = items
}
