import { DestroyRef, Directive, ElementRef, Renderer2, type Signal, computed, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkClipboardContext } from './use-clipboard-context'

@Directive({
  selector: '[arkClipboardIndicator]',
  standalone: true,
  exportAs: 'arkClipboardIndicator',
})
export class ArkClipboardIndicator {
  readonly copied: Signal<boolean>

  constructor() {
    const context = injectArkClipboardContext()
    this.copied = computed(() => context.api().copied)
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const api = context.api()
        return api.getIndicatorProps({ copied: this.copied() })
      },
    })
  }
}
