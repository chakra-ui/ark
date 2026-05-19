import { DestroyRef, Directive, ElementRef, Renderer2, effect, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { comboboxAnatomy } from './combobox.anatomy'
import { injectArkComboboxContext } from './use-combobox-context'

const parts = comboboxAnatomy.build()

@Directive({
  selector: '[arkComboboxEmpty]',
  standalone: true,
  exportAs: 'arkComboboxEmpty',
})
export class ArkComboboxEmpty {
  constructor() {
    const context = injectArkComboboxContext()
    const elementRef = inject(ElementRef) as ElementRef<HTMLElement>
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)

    for (const [key, value] of Object.entries(parts.empty.attrs)) {
      renderer.setAttribute(elementRef.nativeElement, key, value)
    }
    renderer.setAttribute(elementRef.nativeElement, 'role', 'presentation')

    effect(() => {
      const empty = context.api().collection.size === 0
      if (empty) {
        renderer.removeStyle(elementRef.nativeElement, 'display')
      } else {
        renderer.setStyle(elementRef.nativeElement, 'display', 'none')
      }
    })

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => ({}),
    })
  }
}
