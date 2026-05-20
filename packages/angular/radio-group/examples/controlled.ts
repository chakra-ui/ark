import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  selector: 'radio-group-controlled-example',
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
    <div arkRadioGroup [(value)]="value">
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
export class RadioGroupControlledExample {
  protected readonly frameworks = ['React', 'Solid', 'Vue']
  readonly value = signal<string | null>(null)
}
