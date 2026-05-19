import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core'
import type { CollectionItem } from '@zag-js/collection'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkListboxContext } from './use-listbox-context'
import { ARK_LISTBOX_ITEM_CONTEXT, type ArkListboxItemContext } from './use-listbox-item-context'

@Directive({
  selector: '[arkListboxItem]',
  standalone: true,
  exportAs: 'arkListboxItem',
  providers: [{ provide: ARK_LISTBOX_ITEM_CONTEXT, useExisting: forwardRef(() => ArkListboxItem) }],
})
export class ArkListboxItem<T extends CollectionItem = CollectionItem> implements ArkListboxItemContext<T> {
  /** The item to render. */
  readonly item: InputSignal<T> = input.required<T>()
  /** Whether to highlight the item on hover. */
  readonly highlightOnHover: InputSignalWithTransform<boolean | undefined, unknown> = input<
    boolean | undefined,
    unknown
  >(undefined, {
    transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)),
  })

  constructor() {
    const context = injectArkListboxContext<T>()
    const itemSignal: Signal<T> = computed(() => this.item())
    const hoverSignal: Signal<boolean | undefined> = computed(() => this.highlightOnHover())
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemProps({ item: itemSignal(), highlightOnHover: hoverSignal() }),
    })
  }
}
