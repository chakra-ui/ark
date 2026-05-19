import { DestroyRef, Directive, ElementRef, Renderer2, computed, forwardRef, inject, input } from '@angular/core'
import type { InputSignal, Signal } from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { StepsItemProps, StepsItemState } from './steps.types'
import { injectArkStepsContext } from './use-steps-context'
import { ARK_STEPS_ITEM_CONTEXT, ARK_STEPS_ITEM_PROPS_CONTEXT } from './use-steps-item-context'

@Directive({
  selector: '[arkStepsItem]',
  standalone: true,
  exportAs: 'arkStepsItem',
  providers: [
    {
      provide: ARK_STEPS_ITEM_PROPS_CONTEXT,
      useFactory: (item: ArkStepsItem) => item.itemProps,
      deps: [forwardRef(() => ArkStepsItem)],
    },
    {
      provide: ARK_STEPS_ITEM_CONTEXT,
      useFactory: (item: ArkStepsItem) => item.itemState,
      deps: [forwardRef(() => ArkStepsItem)],
    },
  ],
})
export class ArkStepsItem {
  /** The zero-based step index. */
  readonly index: InputSignal<number> = input.required<number>()

  private readonly steps = injectArkStepsContext()
  readonly itemProps: Signal<StepsItemProps> = computed(() => ({ index: this.index() }))
  readonly itemState: Signal<StepsItemState> = computed(() => this.steps.api().getItemState(this.itemProps()))

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.steps.api().getItemProps(this.itemProps()),
    })
  }
}
