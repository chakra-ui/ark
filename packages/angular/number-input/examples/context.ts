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
  selector: 'number-input-context-example',
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
    <div arkNumberInputRoot #numberInput="arkNumberInputRoot">
      <span arkNumberInputLabel>Value: {{ numberInput.api().valueAsNumber }}</span>
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
export class NumberInputContextExample {}
