import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
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
