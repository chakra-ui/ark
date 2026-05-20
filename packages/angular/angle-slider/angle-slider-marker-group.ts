import { Directive } from '@angular/core'
import { applyAngleSliderPartProps } from './apply-angle-slider-part-props'
import { injectArkAngleSliderContext } from './use-angle-slider-context'

@Directive({
  selector: '[arkAngleSliderMarkerGroup]',
  standalone: true,
  exportAs: 'arkAngleSliderMarkerGroup',
})
export class ArkAngleSliderMarkerGroup {
  constructor() {
    const context = injectArkAngleSliderContext()
    applyAngleSliderPartProps(() => context.api().getMarkerGroupProps())
  }
}
