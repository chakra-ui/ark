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
import { NumberInputChevronDownIcon, NumberInputChevronUpIcon } from './icons'

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
    NumberInputChevronUpIcon,
    NumberInputChevronDownIcon,
  ],
  template: `
    <div arkFieldRoot>
      <div arkNumberInputRoot>
        <span arkNumberInputLabel>Label</span>
        <div arkNumberInputControl>
          <input arkNumberInputInput />
          <div class="trigger-group">
            <button arkNumberInputIncrementTrigger><number-input-chevron-up-icon /></button>
            <button arkNumberInputDecrementTrigger><number-input-chevron-down-icon /></button>
          </div>
        </div>
      </div>
      <span arkFieldHelperText>Additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [numberInputExampleStyles],
})
export class NumberInputWithFieldExample {}
