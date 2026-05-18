import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject, untracked } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkFieldsetContext } from './use-fieldset-context'

@Directive({
  selector: '[arkFieldsetHelperText]',
  standalone: true,
  exportAs: 'arkFieldsetHelperText',
})
export class ArkFieldsetHelperText {
  constructor() {
    const context = injectArkFieldsetContext()

    effect((onCleanup) => {
      untracked(() => context.setHasHelperText(true))
      onCleanup(() => untracked(() => context.setHasHelperText(false)))
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.getHelperTextProps(),
    })
  }
}
