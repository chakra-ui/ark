import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  numberAttribute,
  booleanAttribute,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkTagsInputContext } from './use-tags-input-context'
import { ARK_TAGS_INPUT_ITEM_CONTEXT, type ArkTagsInputItemContext } from './use-tags-input-item-context'

@Directive({
  selector: '[arkTagsInputItem]',
  standalone: true,
  exportAs: 'arkTagsInputItem',
  providers: [{ provide: ARK_TAGS_INPUT_ITEM_CONTEXT, useExisting: forwardRef(() => ArkTagsInputItem) }],
})
export class ArkTagsInputItem implements ArkTagsInputItemContext {
  /** Zero-based index of this tag item. */
  readonly index: InputSignalWithTransform<number, unknown> = input.required<number, unknown>({
    transform: numberAttribute,
  })
  /** The value string of this tag item. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Whether this tag item is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  constructor() {
    const context = injectArkTagsInputContext()
    const indexSignal: Signal<number> = computed(() => this.index())
    const valueSignal: Signal<string> = computed(() => this.value())
    const disabledSignal: Signal<boolean> = computed(() => this.disabled())

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getItemProps({ index: indexSignal(), value: valueSignal(), disabled: disabledSignal() }),
    })
  }
}
