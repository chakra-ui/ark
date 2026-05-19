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
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import type * as menu from '@zag-js/menu'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMenuContext } from './use-menu-context'
import { ARK_MENU_ITEM_CONTEXT, type ArkMenuItemContext } from './use-menu-item-context'

@Directive({
  selector: '[arkMenuItem]',
  standalone: true,
  exportAs: 'arkMenuItem',
  providers: [{ provide: ARK_MENU_ITEM_CONTEXT, useExisting: forwardRef(() => ArkMenuItem) }],
})
export class ArkMenuItem implements ArkMenuItemContext {
  /** The unique value of the menu item option. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Whether the menu item is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The textual value of the option. Used in typeahead navigation. */
  readonly valueText: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the menu should be closed when the option is selected. */
  readonly closeOnSelect: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)
  /** Fired when this item is selected. Mirrors React's item-level `onSelect`. */
  readonly select: OutputEmitterRef<void> = output<void>()

  private readonly context = injectArkMenuContext()
  readonly api: Signal<menu.Api> = computed(() => this.context.api())
  readonly checked: Signal<boolean | undefined> = computed(() => undefined)

  private readonly itemProps = computed(() => ({
    value: this.value(),
    disabled: this.disabled(),
    valueText: this.valueText(),
    closeOnSelect: this.closeOnSelect(),
  }))

  readonly highlighted: Signal<boolean> = computed(() => this.context.api().getItemState(this.itemProps()).highlighted)
  readonly itemId: Signal<string> = computed(() => this.context.api().getItemState(this.itemProps()).id)

  constructor() {
    const destroyRef = inject(DestroyRef)
    const elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
    const renderer = inject(Renderer2)
    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => this.context.api().getItemProps(this.itemProps()),
    })

    const dispose = renderer.listen(elementRef.nativeElement, 'menu:select', () => this.select.emit())
    destroyRef.onDestroy(() => dispose?.())
  }
}
