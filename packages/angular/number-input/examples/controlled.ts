import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  selector: 'number-input-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkNumberInputRoot,
    ArkNumberInputLabel,
    ArkNumberInputControl,
    ArkNumberInputInput,
    ArkNumberInputIncrementTrigger,
    ArkNumberInputDecrementTrigger,
  ],
  template: `
    <div arkNumberInputRoot [(value)]="value">
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
export class NumberInputControlledExample {
  readonly value = signal<string | undefined>('5')
}
