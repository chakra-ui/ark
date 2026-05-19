import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkPinInputControl,
  ArkPinInputHiddenInput,
  ArkPinInputInput,
  ArkPinInputLabel,
  ArkPinInputRoot,
} from '@ark-ui/angular/pin-input'
import { pinInputExampleStyles } from '../pin-input-example-styles'

@Component({
  selector: 'pin-input-blur-on-complete-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkPinInputRoot, ArkPinInputLabel, ArkPinInputControl, ArkPinInputInput, ArkPinInputHiddenInput],
  template: `
    <div arkPinInputRoot blurOnComplete>
      <span arkPinInputLabel>Label</span>
      <div arkPinInputControl>
        <input arkPinInputInput [index]="0" />
        <input arkPinInputInput [index]="1" />
        <input arkPinInputInput [index]="2" />
      </div>
      <input arkPinInputHiddenInput />
    </div>
  `,
  styles: [pinInputExampleStyles],
})
export class PinInputBlurOnCompleteExample {}
