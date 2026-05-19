import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import {
  ArkNumberInputControl,
  ArkNumberInputDecrementTrigger,
  ArkNumberInputIncrementTrigger,
  ArkNumberInputInput,
  ArkNumberInputLabel,
  ArkNumberInputRoot,
} from '@ark-ui/angular/number-input'
import { numberInputExampleStyles } from '../number-input-example-styles'

@Component({
  selector: 'number-input-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldErrorText,
    ArkFieldHelperText,
    ArkNumberInputRoot,
    ArkNumberInputLabel,
    ArkNumberInputControl,
    ArkNumberInputInput,
    ArkNumberInputIncrementTrigger,
    ArkNumberInputDecrementTrigger,
  ],
  template: `
    <div arkFieldRoot [invalid]="true">
      <div arkNumberInputRoot>
        <span arkNumberInputLabel>Quantity</span>
        <div arkNumberInputControl>
          <input arkNumberInputInput />
          <button arkNumberInputIncrementTrigger>+</button>
          <button arkNumberInputDecrementTrigger>-</button>
        </div>
      </div>
      <span arkFieldHelperText>Additional info</span>
      <span arkFieldErrorText>Error info</span>
    </div>
  `,
  styles: [numberInputExampleStyles],
})
export class NumberInputWithFieldExample {}
