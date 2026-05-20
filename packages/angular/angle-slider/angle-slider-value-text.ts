import { Directive, type Signal, computed } from '@angular/core'
import { applyAngleSliderPartProps } from './apply-angle-slider-part-props'
import { injectArkAngleSliderContext } from './use-angle-slider-context'

@Directive({
  selector: '[arkAngleSliderValueText]',
  standalone: true,
  exportAs: 'arkAngleSliderValueText',
})
export class ArkAngleSliderValueText {
  private readonly context = injectArkAngleSliderContext()
  readonly value: Signal<number> = computed(() => this.context.api().value)
  readonly valueAsDegree: Signal<string> = computed(() => this.context.api().valueAsDegree)

  constructor() {
    applyAngleSliderPartProps(() => this.context.api().getValueTextProps())
  }
}
