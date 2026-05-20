import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkRadioGroupItem,
  ArkRadioGroupItemControl,
  ArkRadioGroupItemHiddenInput,
  ArkRadioGroupItemText,
  ArkRadioGroupLabel,
  ArkRadioGroupRoot,
} from '../public-api'
import { radioGroupExampleStyles } from '../radio-group-example-styles'

@Component({
  selector: 'radio-group-disabled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkRadioGroupRoot,
    ArkRadioGroupLabel,
    ArkRadioGroupItem,
    ArkRadioGroupItemControl,
    ArkRadioGroupItemText,
    ArkRadioGroupItemHiddenInput,
  ],
  template: `
    <div arkRadioGroup defaultValue="React" disabled>
      <span arkRadioGroupLabel>Framework</span>
      @for (framework of frameworks; track framework) {
        <label arkRadioGroupItem [value]="framework">
          <div arkRadioGroupItemControl></div>
          <span arkRadioGroupItemText>{{ framework }}</span>
          <input arkRadioGroupItemHiddenInput />
        </label>
      }
    </div>
  `,
  styles: [radioGroupExampleStyles],
})
export class RadioGroupDisabledExample {
  protected readonly frameworks = ['React', 'Solid', 'Vue']
}
