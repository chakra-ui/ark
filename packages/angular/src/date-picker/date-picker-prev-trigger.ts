import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDatePickerContext, injectArkDatePickerViewContext } from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerPrevTrigger]',
  standalone: true,
  exportAs: 'arkDatePickerPrevTrigger',
})
export class ArkDatePickerPrevTrigger {
  constructor() {
    const context = injectArkDatePickerContext()
    const view = injectArkDatePickerViewContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getPrevTriggerProps(view()),
    })
  }
}
