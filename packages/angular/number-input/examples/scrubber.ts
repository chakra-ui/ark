import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkNumberInputControl,
  ArkNumberInputDecrementTrigger,
  ArkNumberInputIncrementTrigger,
  ArkNumberInputInput,
  ArkNumberInputLabel,
  ArkNumberInputRoot,
  ArkNumberInputScrubber,
} from '@ark-ui/angular/number-input'
import { numberInputExampleStyles } from '../number-input-example-styles'
import { NumberInputArrowLeftRightIcon, NumberInputChevronDownIcon, NumberInputChevronUpIcon } from './icons'

@Component({
  selector: 'number-input-scrubber-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkNumberInputRoot,
    ArkNumberInputLabel,
    ArkNumberInputControl,
    ArkNumberInputScrubber,
    ArkNumberInputInput,
    ArkNumberInputIncrementTrigger,
    ArkNumberInputDecrementTrigger,
    NumberInputArrowLeftRightIcon,
    NumberInputChevronUpIcon,
    NumberInputChevronDownIcon,
  ],
  template: `
    <div arkNumberInputRoot defaultValue="32">
      <span arkNumberInputLabel>Label</span>
      <div arkNumberInputControl>
        <div arkNumberInputScrubber>
          <number-input-arrow-left-right-icon />
        </div>
        <input arkNumberInputInput data-has-scrubber />
        <div class="trigger-group">
          <button arkNumberInputIncrementTrigger><number-input-chevron-up-icon /></button>
          <button arkNumberInputDecrementTrigger><number-input-chevron-down-icon /></button>
        </div>
      </div>
    </div>
  `,
  styles: [numberInputExampleStyles],
})
export class NumberInputScrubberExample {}
