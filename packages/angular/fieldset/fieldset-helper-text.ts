import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
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
      onCleanup(context.registerHelperText())
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.getHelperTextProps(),
    })
  }
}
