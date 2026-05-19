import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { listboxAnatomy } from './listbox.anatomy'
import { injectArkListboxContext } from './use-listbox-context'

const parts = listboxAnatomy.build()

@Directive({
  selector: '[arkListboxEmpty]',
  standalone: true,
  exportAs: 'arkListboxEmpty',
})
export class ArkListboxEmpty {
  constructor() {
    const context = injectArkListboxContext()
    const elementRef = inject(ElementRef) as ElementRef<HTMLElement>
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)

    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => ({
        ...parts.empty.attrs,
        role: 'status',
        style: { display: context.api().collection.size === 0 ? undefined : 'none' },
      }),
    })
  }
}
