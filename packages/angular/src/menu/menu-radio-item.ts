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
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMenuContext } from './use-menu-context'
import { ARK_MENU_ITEM_CONTEXT, type ArkMenuItemContext } from './use-menu-item-context'
import { injectArkMenuRadioItemGroupContext } from './use-menu-radio-item-group-context'

@Directive({
  selector: '[arkMenuRadioItem]',
  standalone: true,
  exportAs: 'arkMenuRadioItem',
  providers: [{ provide: ARK_MENU_ITEM_CONTEXT, useExisting: forwardRef(() => ArkMenuRadioItem) }],
})
export class ArkMenuRadioItem implements ArkMenuItemContext {
  /** The unique value of the radio item within its group. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Whether the radio item is disabled. */
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
  private readonly radioGroup = injectArkMenuRadioItemGroupContext()
  readonly api: Signal<menu.Api> = computed(() => this.context.api())
  readonly checked: Signal<boolean | undefined> = computed(() => this.radioGroup.value() === this.value())

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        this.context.api().getOptionItemProps({
          type: 'radio',
          value: this.value(),
          checked: this.checked() ?? false,
          disabled: this.disabledInput(),
          valueText: this.valueText(),
          closeOnSelect: this.closeOnSelect(),
          onCheckedChange: () => this.radioGroup.setValue(this.value()),
        }),
    })
  }
}
