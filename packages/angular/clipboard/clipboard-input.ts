import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkClipboardContext } from './use-clipboard-context'

@Directive({
  selector: 'input[arkClipboardInput]',
  standalone: true,
  exportAs: 'arkClipboardInput',
})
export class ArkClipboardInput {
  constructor() {
    const context = injectArkClipboardContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getInputProps(),
    })
  }
}
