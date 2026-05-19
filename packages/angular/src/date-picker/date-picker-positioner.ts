import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDatePickerContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerPositioner]',
  standalone: true,
  exportAs: 'arkDatePickerPositioner',
})
export class ArkDatePickerPositioner {
  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getPositionerProps(),
    })
  }
}
