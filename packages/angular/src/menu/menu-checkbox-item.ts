import type * as menu from '@zag-js/menu'
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
  model,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMenuContext } from './use-menu-context'
import { ARK_MENU_ITEM_CONTEXT, type ArkMenuItemContext } from './use-menu-item-context'

@Directive({
  selector: '[arkMenuCheckboxItem]',
  standalone: true,
  exportAs: 'arkMenuCheckboxItem',
  providers: [{ provide: ARK_MENU_ITEM_CONTEXT, useExisting: forwardRef(() => ArkMenuCheckboxItem) }],
})
export class ArkMenuCheckboxItem implements ArkMenuItemContext {
  /** The unique value of the checkbox item. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Controlled checked state. */
  readonly checked: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** Whether the checkbox item is disabled. */
  readonly disabledInput: InputSignalWithTransform<boolean, unknown> = input(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  })
  /** The textual value of the option. Used in typeahead navigation. */
  readonly valueText: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the menu should be closed when this option is selected. */
  readonly closeOnSelect: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)

  readonly disabled: Signal<boolean | undefined> = computed(() => this.disabledInput())

  private readonly context = injectArkMenuContext()
  readonly api: Signal<menu.Api> = computed(() => this.context.api())

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        this.context.api().getOptionItemProps({
          type: 'checkbox',
          value: this.value(),
          checked: this.checked() ?? false,
          disabled: this.disabledInput(),
          valueText: this.valueText(),
          closeOnSelect: this.closeOnSelect(),
          onCheckedChange: (next) => {
            if (this.checked() === next) return
            this.checked.set(next)
          },
        }),
    })
  }
}
