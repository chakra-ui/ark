import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkRatingGroupContext } from './use-rating-group-context'

@Directive({
  selector: '[arkRatingGroupLabel]',
  standalone: true,
  exportAs: 'arkRatingGroupLabel',
})
export class ArkRatingGroupLabel {
  constructor() {
    const context = injectArkRatingGroupContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getLabelProps(),
    })
  }
}
