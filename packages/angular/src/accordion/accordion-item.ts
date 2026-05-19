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
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkAccordionContext } from './use-accordion-context'
import { ARK_ACCORDION_ITEM_CONTEXT, type ArkAccordionItemContext } from './use-accordion-item-context'

@Directive({
  selector: '[arkAccordionItem]',
  standalone: true,
  exportAs: 'arkAccordionItem',
  providers: [
    {
      provide: ARK_ACCORDION_ITEM_CONTEXT,
      useFactory: (item: ArkAccordionItem) => item.getItemContext(),
      deps: [forwardRef(() => ArkAccordionItem)],
    },
  ],
})
export class ArkAccordionItem {
  /** The value of the accordion item. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Whether the accordion item is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  private readonly root = injectArkAccordionContext()
  private readonly itemContext: ArkAccordionItemContext = {
    value: computed(() => this.value()),
    disabled: computed(() => this.disabled()),
    state: computed(() => this.root.api().getItemState({ value: this.value(), disabled: this.disabled() })),
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        this.root.api().getItemProps({
          value: this.value(),
          disabled: this.disabled(),
        }),
    })
  }

  /** @internal Exposed for item-scoped descendant directives via ARK_ACCORDION_ITEM_CONTEXT. */
  getItemContext(): ArkAccordionItemContext {
    return this.itemContext
  }
}
