import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import {
  ArkSwitchControl,
  ArkSwitchHiddenInput,
  ArkSwitchLabel,
  ArkSwitchRoot,
  ArkSwitchThumb,
} from '@ark-ui/angular/switch'
import { fieldExampleStyles } from '../../field/field-example-styles'
import { switchExampleStyles } from '../switch-example-styles'

@Component({
  selector: 'switch-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldHelperText,
    ArkFieldErrorText,
    ArkSwitchRoot,
    ArkSwitchControl,
    ArkSwitchThumb,
    ArkSwitchLabel,
    ArkSwitchHiddenInput,
  ],
  template: `
    <div arkFieldRoot>
      <label arkSwitch>
        <span arkSwitchControl>
          <span arkSwitchThumb></span>
        </span>
        <span arkSwitchLabel>Label</span>
        <input arkSwitchHiddenInput />
      </label>
      <span arkFieldHelperText>Additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [fieldExampleStyles, switchExampleStyles],
})
export class SwitchWithFieldExample {}
