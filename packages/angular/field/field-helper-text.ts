import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject, untracked } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldContext } from './use-field-context'

@Directive({
  selector: '[arkFieldHelperText]',
  standalone: true,
  exportAs: 'arkFieldHelperText',
})
export class ArkFieldHelperText {
  constructor() {
    const context = injectArkFieldContext()

    effect((onCleanup) => {
      const unregister = untracked(() => context.registerHelperText())
      onCleanup(() => untracked(unregister))
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.getHelperTextProps(),
    })
  }
}
