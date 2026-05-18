import { DestroyRef, Directive, ElementRef, Renderer2, inject } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMenuContext } from './use-menu-context'
import { injectArkMenuItemContext } from './use-menu-item-context'

@Directive({
  selector: '[arkMenuItemIndicator]',
  standalone: true,
  exportAs: 'arkMenuItemIndicator',
})
export class ArkMenuItemIndicator {
  constructor() {
    const context = injectArkMenuContext()
    const item = injectArkMenuItemContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const checked = item.checked()
        return context.api().getItemIndicatorProps({
          value: item.value(),
          disabled: item.disabled(),
          valueText: item.valueText(),
          ...(checked !== undefined ? { checked } : {}),
        })
      },
    })
  }
}
