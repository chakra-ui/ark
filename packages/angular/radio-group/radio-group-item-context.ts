import { DestroyRef, Directive, TemplateRef, ViewContainerRef, effect, inject, type Signal } from '@angular/core'
import type { RadioGroupItemState } from './radio-group.types'
import { injectArkRadioGroupItemContext } from './use-radio-group-item-context'

export interface RadioGroupItemContextTemplate {
  $implicit: Signal<RadioGroupItemState>
  item: Signal<RadioGroupItemState>
}

@Directive({
  selector: '[arkRadioGroupItemContext]',
  standalone: true,
  exportAs: 'arkRadioGroupItemContext',
})
export class ArkRadioGroupItemContext {
  static ngTemplateContextGuard(
    _directive: ArkRadioGroupItemContext,
    context: unknown,
  ): context is RadioGroupItemContextTemplate {
    return true
  }

  private readonly item = injectArkRadioGroupItemContext()
  private readonly templateRef = inject<TemplateRef<RadioGroupItemContextTemplate>>(TemplateRef)
  private readonly viewContainer = inject(ViewContainerRef)

  constructor() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.item.itemState,
      item: this.item.itemState,
    })

    effect(() => {
      this.item.itemState()
      view.detectChanges()
    })

    inject(DestroyRef).onDestroy(() => view.destroy())
  }
}
