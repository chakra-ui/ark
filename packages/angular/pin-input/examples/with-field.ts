import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import {
  ArkPinInputControl,
  ArkPinInputHiddenInput,
  ArkPinInputInput,
  ArkPinInputLabel,
  ArkPinInputRoot,
} from '@ark-ui/angular/pin-input'
import { pinInputExampleStyles } from '../pin-input-example-styles'

@Component({
  selector: 'pin-input-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldErrorText,
    ArkFieldHelperText,
    ArkPinInputRoot,
    ArkPinInputLabel,
    ArkPinInputControl,
    ArkPinInputInput,
    ArkPinInputHiddenInput,
  ],
  template: `
    <div arkFieldRoot>
      <div arkPinInputRoot>
        <span arkPinInputLabel>Label</span>
        <div arkPinInputControl>
          <input arkPinInputInput [index]="0" />
          <input arkPinInputInput [index]="1" />
          <input arkPinInputInput [index]="2" />
        </div>
        <input arkPinInputHiddenInput />
      </div>
      <span arkFieldHelperText>Additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [pinInputExampleStyles],
})
export class PinInputWithFieldExample {}
