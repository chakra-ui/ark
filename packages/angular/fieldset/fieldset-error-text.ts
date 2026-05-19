import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject, untracked } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldsetContext } from './use-fieldset-context'

@Directive({
  selector: '[arkFieldsetErrorText]',
  standalone: true,
  exportAs: 'arkFieldsetErrorText',
})
export class ArkFieldsetErrorText {
  constructor() {
    const context = injectArkFieldsetContext()

    effect((onCleanup) => {
      const unregister = untracked(() => context.registerErrorText())
      onCleanup(() => untracked(unregister))
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.getErrorTextProps(),
    })
  }
}
