import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkAccordionContext } from './use-accordion-context'
import { injectArkAccordionItemContext } from './use-accordion-item-context'

@Directive({
  selector: '[arkAccordionItemContent]',
  standalone: true,
  exportAs: 'arkAccordionItemContent',
})
export class ArkAccordionItemContent {
  constructor() {
    const context = injectArkAccordionContext()
    const item = injectArkAccordionItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getItemContentProps({
          value: item.value(),
          disabled: item.disabled(),
        }),
    })
  }
}
