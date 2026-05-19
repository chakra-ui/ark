import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDatePickerContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerTrigger]',
  standalone: true,
  exportAs: 'arkDatePickerTrigger',
})
export class ArkDatePickerTrigger {
  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTriggerProps(),
    })
  }
}
