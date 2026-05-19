import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMenuContext } from './use-menu-context'

@Directive({
  selector: '[arkMenuTrigger]',
  standalone: true,
  exportAs: 'arkMenuTrigger',
})
export class ArkMenuTrigger {
  /** The value that identifies this specific trigger. */
  readonly value: InputSignal<string | undefined> = input<string | undefined>(undefined)

  constructor() {
    const context = injectArkMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTriggerProps({ value: this.value() }),
    })
  }
}
