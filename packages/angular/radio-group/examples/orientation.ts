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
  selector: 'radio-group-orientation-example',
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
    <div arkRadioGroup orientation="horizontal" defaultValue="React">
      <span arkRadioGroupLabel>Framework</span>
      <div class="hstack">
        @for (framework of frameworks; track framework) {
          <label arkRadioGroupItem [value]="framework">
            <div arkRadioGroupItemControl></div>
            <span arkRadioGroupItemText>{{ framework }}</span>
            <input arkRadioGroupItemHiddenInput />
          </label>
        }
      </div>
    </div>
  `,
  styles: [radioGroupExampleStyles],
})
export class RadioGroupOrientationExample {
  protected readonly frameworks = ['React', 'Solid', 'Vue']
}
