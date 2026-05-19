import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDatePickerContext, injectArkDatePickerViewContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerNextTrigger]',
  standalone: true,
  exportAs: 'arkDatePickerNextTrigger',
})
export class ArkDatePickerNextTrigger {
  constructor() {
    const context = injectArkDatePickerContext()
    const view = injectArkDatePickerViewContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getNextTriggerProps(view()),
    })
  }
}
