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
import { injectArkSelectContext } from './use-select-context'
import { ARK_SELECT_ITEM_CONTEXT, type ArkSelectItemContext } from './use-select-item-context'

@Directive({
  selector: '[arkSelectItem]',
  standalone: true,
  exportAs: 'arkSelectItem',
  providers: [{ provide: ARK_SELECT_ITEM_CONTEXT, useExisting: forwardRef(() => ArkSelectItem) }],
})
export class ArkSelectItem<T extends CollectionItem = CollectionItem> implements ArkSelectItemContext<T> {
  /** The item to render. */
  readonly item: InputSignal<T> = input.required<T>()
  /** Whether hovering outside should clear the highlighted state. */
  readonly persistFocus: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )

  constructor() {
    const context = injectArkSelectContext()
    const itemSignal: Signal<T> = computed(() => this.item())
    const persistFocusSignal: Signal<boolean | undefined> = computed(() => this.persistFocus())
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemProps({ item: itemSignal(), persistFocus: persistFocusSignal() }),
    })
  }
}
