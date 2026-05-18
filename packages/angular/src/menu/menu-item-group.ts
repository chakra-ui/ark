import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMenuContext } from './use-menu-context'
import { ARK_MENU_ITEM_GROUP_CONTEXT, type ArkMenuItemGroupContext } from './use-menu-item-group-context'

let groupIdCounter = 0

@Directive({
  selector: '[arkMenuItemGroup]',
  standalone: true,
  exportAs: 'arkMenuItemGroup',
  providers: [{ provide: ARK_MENU_ITEM_GROUP_CONTEXT, useExisting: forwardRef(() => ArkMenuItemGroup) }],
})
export class ArkMenuItemGroup implements ArkMenuItemGroupContext {
  /** Optional explicit id for the group; auto-generated when omitted. */
  readonly idInput: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'id' })

  private readonly fallbackId = `ark-menu-item-group::${++groupIdCounter}`

  readonly id: Signal<string> = computed(() => this.idInput() ?? this.fallbackId)

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
