import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSwitchContext,
  ArkSwitchControl,
  ArkSwitchHiddenInput,
  ArkSwitchLabel,
  ArkSwitchRoot,
  ArkSwitchThumb,
} from '@ark-ui/angular/switch'
import { switchExampleStyles } from '../switch-example-styles'

@Component({
  selector: 'switch-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSwitchRoot, ArkSwitchControl, ArkSwitchThumb, ArkSwitchContext, ArkSwitchLabel, ArkSwitchHiddenInput],
  template: `
    <label arkSwitch>
      <span arkSwitchControl>
        <span arkSwitchThumb></span>
      </span>
      <ng-template arkSwitchContext let-switch="api">
        <span arkSwitchLabel>Feature is {{ switch().checked ? 'enabled' : 'disabled' }}</span>
      </ng-template>
      <input arkSwitchHiddenInput />
    </label>
  `,
  styles: [switchExampleStyles],
})
export class SwitchContextExample {}
