import { Directive } from '@angular/core'
import { applyAngleSliderPartProps } from './apply-angle-slider-part-props'
import { injectArkAngleSliderContext } from './use-angle-slider-context'

@Directive({
  selector: '[arkAngleSliderThumb]',
  standalone: true,
  exportAs: 'arkAngleSliderThumb',
})
export class ArkAngleSliderThumb {
  constructor() {
    const context = injectArkAngleSliderContext()
    applyAngleSliderPartProps(() => context.api().getThumbProps())
  }
}
