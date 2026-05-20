import { Directive } from '@angular/core'
import { applyAngleSliderPartProps } from './apply-angle-slider-part-props'
import { injectArkAngleSliderContext } from './use-angle-slider-context'

@Directive({
  selector: '[arkAngleSliderLabel]',
  standalone: true,
  exportAs: 'arkAngleSliderLabel',
})
export class ArkAngleSliderLabel {
  constructor() {
    const context = injectArkAngleSliderContext()
    applyAngleSliderPartProps(() => context.api().getLabelProps())
  }
}
