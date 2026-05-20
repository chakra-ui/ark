import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSwitchControl,
  ArkSwitchHiddenInput,
  ArkSwitchLabel,
  ArkSwitchRoot,
  ArkSwitchThumb,
} from '@ark-ui/angular/switch'
import { switchExampleStyles } from '../switch-example-styles'

@Component({
  selector: 'switch-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSwitchRoot, ArkSwitchControl, ArkSwitchThumb, ArkSwitchLabel, ArkSwitchHiddenInput],
  template: `
    <label arkSwitch>
      <span arkSwitchControl>
        <span arkSwitchThumb></span>
      </span>
      <span arkSwitchLabel>Label</span>
      <input arkSwitchHiddenInput />
    </label>
  `,
  styles: [switchExampleStyles],
})
export class SwitchBasicExample {}
