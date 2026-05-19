import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkPinInputControl,
  ArkPinInputHiddenInput,
  ArkPinInputInput,
  ArkPinInputLabel,
  ArkPinInputRoot,
} from '@ark-ui/angular/pin-input'
import { pinInputExampleStyles } from '../pin-input-example-styles'

@Component({
  selector: 'pin-input-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkPinInputRoot, ArkPinInputLabel, ArkPinInputControl, ArkPinInputInput, ArkPinInputHiddenInput],
  template: `
    <div arkPinInputRoot [(value)]="value">
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
export class PinInputControlledExample {
  readonly value = signal<string[] | undefined>(['1', '2', '3'])
}
