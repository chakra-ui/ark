import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  inject,
  input,
  numberAttribute,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkSliderContext } from './use-slider-context'

@Directive({
  selector: '[arkSliderMarker]',
  standalone: true,
  exportAs: 'arkSliderMarker',
})
export class ArkSliderMarker {
  /** The marker value. */
  readonly value: InputSignalWithTransform<number, unknown> = input.required<number, unknown>({
    transform: numberAttribute,
  })

  constructor() {
    const context = injectArkSliderContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getMarkerProps({ value: this.value() }),
    })
  }
}
