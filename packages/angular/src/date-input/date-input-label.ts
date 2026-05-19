import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkDateInputContext } from './use-date-input-context'

@Directive({
  selector: '[arkDateInputLabel]',
  standalone: true,
  exportAs: 'arkDateInputLabel',
})
export class ArkDateInputLabel {
  /** The range index for the label. */
  readonly index: InputSignal<number | undefined> = input<number | undefined>(undefined)

  constructor() {
    const context = injectArkDateInputContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getLabelProps({ index: this.index() }),
    })
  }
}
