import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  model,
  type InputSignal,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMenuContext } from './use-menu-context'
import {
  ARK_MENU_RADIO_ITEM_GROUP_CONTEXT,
  type ArkMenuRadioItemGroupContext,
} from './use-menu-radio-item-group-context'

let radioGroupIdCounter = 0

@Directive({
  selector: '[arkMenuRadioItemGroup]',
  standalone: true,
  exportAs: 'arkMenuRadioItemGroup',
  providers: [{ provide: ARK_MENU_RADIO_ITEM_GROUP_CONTEXT, useExisting: forwardRef(() => ArkMenuRadioItemGroup) }],
})
export class ArkMenuRadioItemGroup implements ArkMenuRadioItemGroupContext {
  /** Optional explicit id for the radio group; auto-generated when omitted. */
  readonly idInput: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'id' })
  /** Controlled selected value within this radio group. */
  readonly value: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)

  private readonly fallbackId = `ark-menu-radio-item-group::${++radioGroupIdCounter}`

  readonly id: Signal<string> = computed(() => this.idInput() ?? this.fallbackId)

  setValue(next: string): void {
    if (this.value() === next) return
    this.value.set(next)
  }

  constructor() {
    const context = injectArkMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getItemGroupProps({ id: this.id() }),
    })
  }
}
