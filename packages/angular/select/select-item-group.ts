import {
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { createArkId } from '@ark-ui/angular/src/internal'
import { injectArkSelectContext } from './use-select-context'

export interface ArkSelectItemGroupContext {
  id: Signal<string>
}

export const ARK_SELECT_ITEM_GROUP_CONTEXT = new InjectionToken<ArkSelectItemGroupContext>(
  'ARK_SELECT_ITEM_GROUP_CONTEXT',
)

export function injectArkSelectItemGroupContext(): ArkSelectItemGroupContext {
  const context = inject(ARK_SELECT_ITEM_GROUP_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_SELECT_ITEM_GROUP_CONTEXT not found: an item-group-label directive must be used inside an [arkSelectItemGroup] directive.',
    )
  }
  return context
}

@Directive({
  selector: '[arkSelectItemGroup]',
  standalone: true,
  exportAs: 'arkSelectItemGroup',
  providers: [{ provide: ARK_SELECT_ITEM_GROUP_CONTEXT, useExisting: forwardRef(() => ArkSelectItemGroup) }],
})
export class ArkSelectItemGroup implements ArkSelectItemGroupContext {
  /** The id of the item group. */
  readonly groupId: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'id' })

  private readonly fallbackId = createArkId('select-item-group')
  readonly id: Signal<string> = computed(() => this.groupId() ?? this.fallbackId)

  constructor() {
    const context = injectArkSelectContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemGroupProps({ id: this.id() }),
    })
  }
}
