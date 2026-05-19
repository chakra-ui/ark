import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPopoverContext } from './use-popover-context'

@Directive({
  selector: '[arkPopoverTrigger]',
  standalone: true,
  exportAs: 'arkPopoverTrigger',
})
export class ArkPopoverTrigger {
  /** The value that identifies this specific trigger. */
  readonly value: InputSignal<string | undefined> = input<string | undefined>(undefined)

  constructor() {
    const context = injectArkPopoverContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTriggerProps({ value: this.value() }),
    })
  }
}
