import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkFieldsetErrorText,
  ArkFieldsetHelperText,
  ArkFieldsetLegend,
  ArkFieldsetRoot,
} from '@ark-ui/angular/fieldset'
import {
  ArkRadioGroupItem,
  ArkRadioGroupItemControl,
  ArkRadioGroupItemHiddenInput,
  ArkRadioGroupItemText,
  ArkRadioGroupRoot,
} from '../public-api'
import { fieldsetExampleStyles } from '../../fieldset/fieldset-example-styles'
import { radioGroupExampleStyles } from '../radio-group-example-styles'

@Component({
  selector: 'radio-group-with-fieldset-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldsetRoot,
    ArkFieldsetLegend,
    ArkFieldsetHelperText,
    ArkFieldsetErrorText,
    ArkRadioGroupRoot,
    ArkRadioGroupItem,
    ArkRadioGroupItemControl,
    ArkRadioGroupItemText,
    ArkRadioGroupItemHiddenInput,
  ],
  template: `
    <fieldset arkFieldsetRoot>
      <legend arkFieldsetLegend>Select a framework</legend>
      <div arkRadioGroup>
        @for (framework of frameworks; track framework) {
          <label arkRadioGroupItem [value]="framework">
            <div arkRadioGroupItemControl></div>
            <span arkRadioGroupItemText>{{ framework }}</span>
            <input arkRadioGroupItemHiddenInput />
          </label>
        }
      </div>
      <div arkFieldsetHelperText>Choose your preferred framework</div>
      <div arkFieldsetErrorText>Please select a framework</div>
    </fieldset>
  `,
  styles: [fieldsetExampleStyles, radioGroupExampleStyles],
})
export class RadioGroupWithFieldsetExample {
  protected readonly frameworks = ['React', 'Solid', 'Vue']
}
