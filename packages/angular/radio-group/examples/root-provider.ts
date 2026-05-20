import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkRadioGroupItem,
  ArkRadioGroupItemControl,
  ArkRadioGroupItemHiddenInput,
  ArkRadioGroupItemText,
  ArkRadioGroupLabel,
  ArkRadioGroupRootProvider,
  useRadioGroup,
} from '../public-api'
import { radioGroupExampleStyles } from '../radio-group-example-styles'

@Component({
  selector: 'radio-group-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkRadioGroupRootProvider,
    ArkRadioGroupLabel,
    ArkRadioGroupItem,
    ArkRadioGroupItemControl,
    ArkRadioGroupItemText,
    ArkRadioGroupItemHiddenInput,
  ],
  template: `
    <div class="stack">
      <div arkRadioGroupRootProvider [value]="radioGroup">
        <span arkRadioGroupLabel>Framework</span>
        @for (framework of frameworks; track framework) {
          <label arkRadioGroupItem [value]="framework">
            <div arkRadioGroupItemControl></div>
            <span arkRadioGroupItemText>{{ framework }}</span>
            <input arkRadioGroupItemHiddenInput />
          </label>
        }
      </div>

      <button class="button" type="button" (click)="setSolid()">Set to Solid</button>
    </div>
  `,
  styles: [radioGroupExampleStyles],
})
export class RadioGroupRootProviderExample {
  protected readonly frameworks = ['React', 'Solid', 'Vue']
  readonly radioGroup = useRadioGroup({ context: () => ({ defaultValue: 'React' }) })

  setSolid(): void {
    this.radioGroup.api().setValue('Solid')
  }
}
