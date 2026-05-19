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
import { injectArkComboboxContext } from './use-combobox-context'

export interface ArkComboboxItemGroupContext {
  id: Signal<string>
}

export const ARK_COMBOBOX_ITEM_GROUP_CONTEXT = new InjectionToken<ArkComboboxItemGroupContext>(
  'ARK_COMBOBOX_ITEM_GROUP_CONTEXT',
)

export function injectArkComboboxItemGroupContext(): ArkComboboxItemGroupContext {
  const context = inject(ARK_COMBOBOX_ITEM_GROUP_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_COMBOBOX_ITEM_GROUP_CONTEXT not found: an item-group-label directive must be used inside an [arkComboboxItemGroup] directive.',
    )
  }
  return context
}

@Directive({
  selector: '[arkComboboxItemGroup]',
  standalone: true,
  exportAs: 'arkComboboxItemGroup',
  providers: [{ provide: ARK_COMBOBOX_ITEM_GROUP_CONTEXT, useExisting: forwardRef(() => ArkComboboxItemGroup) }],
})
export class ArkComboboxItemGroup implements ArkComboboxItemGroupContext {
  /** The id of the item group. */
  readonly groupId: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'id' })

  private readonly fallbackId = createArkId('combobox-item-group')
  readonly id: Signal<string> = computed(() => this.groupId() ?? this.fallbackId)

  constructor() {
    const context = injectArkComboboxContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemGroupProps({ id: this.id() }),
    })
  }
}
