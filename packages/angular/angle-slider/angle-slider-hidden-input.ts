import { Directive } from '@angular/core'
import { applyAngleSliderPartProps } from './apply-angle-slider-part-props'
import { injectArkAngleSliderContext } from './use-angle-slider-context'

@Directive({
  selector: 'input[arkAngleSliderHiddenInput]',
  standalone: true,
  exportAs: 'arkAngleSliderHiddenInput',
})
export class ArkAngleSliderHiddenInput {
  constructor() {
    const context = injectArkAngleSliderContext()
    applyAngleSliderPartProps(() => context.api().getHiddenInputProps())
  }
}
