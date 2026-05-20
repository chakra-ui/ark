import { Directive } from '@angular/core'
import { applyAngleSliderPartProps } from './apply-angle-slider-part-props'
import { injectArkAngleSliderContext } from './use-angle-slider-context'

@Directive({
  selector: '[arkAngleSliderControl]',
  standalone: true,
  exportAs: 'arkAngleSliderControl',
})
export class ArkAngleSliderControl {
  constructor() {
    const context = injectArkAngleSliderContext()
    applyAngleSliderPartProps(() => context.api().getControlProps())
  }
}
