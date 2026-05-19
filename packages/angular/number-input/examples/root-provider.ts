import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkNumberInputControl,
  ArkNumberInputDecrementTrigger,
  ArkNumberInputIncrementTrigger,
  ArkNumberInputInput,
  ArkNumberInputLabel,
  ArkNumberInputRootProvider,
  useNumberInput,
} from '@ark-ui/angular/number-input'
import { numberInputExampleStyles } from '../number-input-example-styles'
import { NumberInputChevronDownIcon, NumberInputChevronUpIcon } from './icons'

@Component({
  selector: 'number-input-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkNumberInputRootProvider,
    ArkNumberInputLabel,
    ArkNumberInputControl,
    ArkNumberInputInput,
    ArkNumberInputIncrementTrigger,
    ArkNumberInputDecrementTrigger,
    NumberInputChevronUpIcon,
    NumberInputChevronDownIcon,
  ],
  template: `
    <div class="stack">
      <output>valueAsNumber: {{ numberInput.api().valueAsNumber }}</output>
      <div arkNumberInputRootProvider [value]="numberInput">
        <span arkNumberInputLabel>Label</span>
        <div arkNumberInputControl>
          <input arkNumberInputInput />
          <div class="trigger-group">
            <button arkNumberInputIncrementTrigger><number-input-chevron-up-icon /></button>
            <button arkNumberInputDecrementTrigger><number-input-chevron-down-icon /></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [numberInputExampleStyles],
})
export class NumberInputRootProviderExample {
  readonly numberInput = useNumberInput({ context: () => ({ defaultValue: '0' }) })
}
