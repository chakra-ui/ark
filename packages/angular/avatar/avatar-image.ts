import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkAvatarContext } from './use-avatar-context'

@Directive({
  selector: 'img[arkAvatarImage]',
  standalone: true,
})
export class ArkAvatarImage {
  constructor() {
    const context = injectArkAvatarContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getImageProps(),
    })
  }
}
