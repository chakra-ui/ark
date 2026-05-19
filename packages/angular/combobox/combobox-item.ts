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
import { injectArkComboboxContext } from './use-combobox-context'
import { ARK_COMBOBOX_ITEM_CONTEXT, type ArkComboboxItemContext } from './use-combobox-item-context'

@Directive({
  selector: '[arkComboboxItem]',
  standalone: true,
  exportAs: 'arkComboboxItem',
  providers: [{ provide: ARK_COMBOBOX_ITEM_CONTEXT, useExisting: forwardRef(() => ArkComboboxItem) }],
})
export class ArkComboboxItem<T extends CollectionItem = CollectionItem> implements ArkComboboxItemContext<T> {
  /** The item to render. */
  readonly item: InputSignal<T> = input.required<T>()
  /** Whether hovering outside should clear the highlighted state. */
  readonly persistFocus: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )

  constructor() {
    const context = injectArkComboboxContext()
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
