import { DestroyRef, Directive, ElementRef, Renderer2, inject, input, type InputSignal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTooltipContext } from './use-tooltip-context'

@Directive({
  selector: '[arkTooltipTrigger]',
  standalone: true,
  exportAs: 'arkTooltipTrigger',
})
export class ArkTooltipTrigger {
  /** The value that identifies this specific trigger. */
  readonly value: InputSignal<string | undefined> = input<string | undefined>(undefined)

  constructor() {
    const context = injectArkTooltipContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTriggerProps({ value: this.value() }),
    })
  }
}
