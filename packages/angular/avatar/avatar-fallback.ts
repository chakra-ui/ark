import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkAvatarContext } from './use-avatar-context'

@Directive({
  selector: '[arkAvatarFallback]',
  standalone: true,
})
export class ArkAvatarFallback {
  constructor() {
    const context = injectArkAvatarContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getFallbackProps(),
    })
  }
}
