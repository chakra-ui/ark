import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkHoverCardContext } from './use-hover-card-context'

@Directive({
  selector: '[arkHoverCardTrigger]',
  standalone: true,
  exportAs: 'arkHoverCardTrigger',
})
export class ArkHoverCardTrigger {
  /** The value that identifies this specific trigger. */
  readonly value: InputSignal<string | undefined> = input<string | undefined>(undefined)

  constructor() {
    const context = injectArkHoverCardContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTriggerProps({ value: this.value() }),
    })
  }
}
