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

@Component({
  selector: 'number-input-min-max-example',
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
    <div arkNumberInputRoot [min]="0" [max]="10">
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
export class NumberInputMinMaxExample {}
