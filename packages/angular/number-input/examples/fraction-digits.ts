import { ChangeDetectionStrategy, Component } from '@angular/core'
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
  selector: 'number-input-fraction-digits-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    <div
      arkNumberInputRoot
      defaultValue="1.00"
      [formatOptions]="{ minimumFractionDigits: 2, maximumFractionDigits: 3 }"
    >
      <span arkNumberInputLabel>Label</span>
      <div arkNumberInputControl>
        <input arkNumberInputInput />
        <div class="trigger-group">
          <button arkNumberInputIncrementTrigger><number-input-chevron-up-icon /></button>
          <button arkNumberInputDecrementTrigger><number-input-chevron-down-icon /></button>
        </div>
      </div>
    </div>
  `,
  styles: [numberInputExampleStyles],
})
export class NumberInputFractionDigitsExample {}
