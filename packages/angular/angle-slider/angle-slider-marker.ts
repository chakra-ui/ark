import { Directive, input, numberAttribute, type InputSignalWithTransform } from '@angular/core'
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
  readonly value: InputSignalWithTransform<AngleSliderMarkerProps['value'], unknown> = input.required<
    AngleSliderMarkerProps['value'],
    unknown
  >({
    transform: numberAttribute,
  })

  constructor() {
    const context = injectArkAngleSliderContext()
    applyAngleSliderPartProps(() => context.api().getMarkerProps({ value: this.value() }))
  }
}
