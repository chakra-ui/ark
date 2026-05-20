import { Directive, input, type InputSignal } from '@angular/core'
import { applyAngleSliderPartProps } from './apply-angle-slider-part-props'
import type { AngleSliderMarkerProps } from './angle-slider.types'
import { injectArkAngleSliderContext } from './use-angle-slider-context'

@Directive({
  selector: '[arkAngleSliderMarker]',
  standalone: true,
  exportAs: 'arkAngleSliderMarker',
})
export class ArkAngleSliderMarker {
  /** The value of the marker. */
  readonly value: InputSignal<AngleSliderMarkerProps['value']> = input.required<AngleSliderMarkerProps['value']>()

  constructor() {
    const context = injectArkAngleSliderContext()
    applyAngleSliderPartProps(() => context.api().getMarkerProps({ value: this.value() }))
  }
}
