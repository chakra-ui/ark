import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkClipboardContext } from './use-clipboard-context'

@Directive({
  selector: '[arkClipboardIndicator]',
  standalone: true,
  exportAs: 'arkClipboardIndicator',
})
export class ArkClipboardIndicator {
  constructor() {
    const context = injectArkClipboardContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getIndicatorProps({ copied: context.api().copied }),
    })
  }
}
