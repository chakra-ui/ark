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
import { injectArkListboxContext } from './use-listbox-context'

export interface ArkListboxItemGroupContext {
  id: Signal<string>
}

export const ARK_LISTBOX_ITEM_GROUP_CONTEXT = new InjectionToken<ArkListboxItemGroupContext>(
  'ARK_LISTBOX_ITEM_GROUP_CONTEXT',
)

export function injectArkListboxItemGroupContext(): ArkListboxItemGroupContext {
  const context = inject(ARK_LISTBOX_ITEM_GROUP_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_LISTBOX_ITEM_GROUP_CONTEXT not found: an item-group-label directive must be used inside an [arkListboxItemGroup] directive.',
    )
  }
  return context
}

@Directive({
  selector: '[arkListboxItemGroup]',
  standalone: true,
  exportAs: 'arkListboxItemGroup',
  providers: [{ provide: ARK_LISTBOX_ITEM_GROUP_CONTEXT, useExisting: forwardRef(() => ArkListboxItemGroup) }],
})
export class ArkListboxItemGroup implements ArkListboxItemGroupContext {
  /** The id of the item group. */
  readonly groupId: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'id' })

  private readonly fallbackId = createArkId('listbox-item-group')
  readonly id: Signal<string> = computed(() => this.groupId() ?? this.fallbackId)

  constructor() {
    const context = injectArkListboxContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemGroupProps({ id: this.id() }),
    })
  }
}
