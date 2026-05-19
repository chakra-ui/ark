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
  ],
  template: `
    <div arkNumberInputRootProvider [value]="numberInput">
      <span arkNumberInputLabel>Label</span>
      <div arkNumberInputControl>
        <input arkNumberInputInput />
        <button arkNumberInputIncrementTrigger>+</button>
        <button arkNumberInputDecrementTrigger>-</button>
      </div>
    </div>
  `,
  styles: [numberInputExampleStyles],
})
export class NumberInputRootProviderExample {
  readonly numberInput = useNumberInput({ context: () => ({ defaultValue: '0' }) })
}
