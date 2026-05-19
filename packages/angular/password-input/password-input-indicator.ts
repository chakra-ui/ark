import { DestroyRef, Directive, ElementRef, Renderer2, computed, inject, type Signal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkPasswordInputContext } from './use-password-input-context'

@Directive({
  selector: '[arkPasswordInputIndicator]',
  standalone: true,
  exportAs: 'arkPasswordInputIndicator',
})
export class ArkPasswordInputIndicator {
  readonly visible: Signal<boolean>

  constructor() {
    const context = injectArkPasswordInputContext()
    this.visible = computed(() => context.api().visible)
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getIndicatorProps(),
    })
  }
}
