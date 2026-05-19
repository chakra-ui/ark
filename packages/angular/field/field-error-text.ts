import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject, untracked } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContext } from './use-field-context'

@Directive({
  selector: '[arkFieldErrorText]',
  standalone: true,
  exportAs: 'arkFieldErrorText',
})
export class ArkFieldErrorText {
  constructor() {
    const context = injectArkFieldContext()

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
