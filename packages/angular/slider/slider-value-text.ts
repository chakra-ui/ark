import { DestroyRef, Directive, ElementRef, Renderer2, computed, inject, type Signal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSliderContext } from './use-slider-context'

@Directive({
  selector: '[arkSliderValueText]',
  standalone: true,
  exportAs: 'arkSliderValueText',
})
export class ArkSliderValueText {
  private readonly context = injectArkSliderContext()
  readonly value: Signal<number[]> = computed(() => this.context.api().value)
  readonly valueAsString: Signal<string> = computed(() => this.value().join(', '))

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.context.api().getValueTextProps(),
    })
  }
}
