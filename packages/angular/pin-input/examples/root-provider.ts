import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkPinInputControl,
  ArkPinInputHiddenInput,
  ArkPinInputInput,
  ArkPinInputLabel,
  ArkPinInputRootProvider,
  usePinInput,
} from '@ark-ui/angular/pin-input'
import { pinInputExampleStyles } from '../pin-input-example-styles'

@Component({
  selector: 'pin-input-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkPinInputRootProvider, ArkPinInputLabel, ArkPinInputControl, ArkPinInputInput, ArkPinInputHiddenInput],
  template: `
    <div class="stack">
      <button type="button" (click)="pinInput.api().focus()">Focus</button>

      <div arkPinInputRootProvider [value]="pinInput">
        <span arkPinInputLabel>Label</span>
        <div arkPinInputControl>
          <input arkPinInputInput [index]="0" />
          <input arkPinInputInput [index]="1" />
          <input arkPinInputInput [index]="2" />
        </div>
        <input arkPinInputHiddenInput />
      </div>
    </div>
  `,
  styles: [pinInputExampleStyles],
})
export class PinInputRootProviderExample {
  readonly pinInput = usePinInput({ context: () => ({ onValueComplete: (details) => alert(details.valueAsString) }) })
}
