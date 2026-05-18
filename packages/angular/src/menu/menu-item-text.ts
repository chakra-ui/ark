import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkMenuContext } from './use-menu-context'

@Directive({
  selector: '[arkMenuItemText]',
  standalone: true,
  exportAs: 'arkMenuItemText',
})
export class ArkMenuItemText {
  /** The value of the parent menu item this text belongs to. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Whether the parent menu item is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The textual value of the parent menu item. */
  readonly valueText: InputSignal<string | undefined> = input<string | undefined>(undefined)

  constructor() {
    const context = injectArkMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getItemTextProps({
          value: this.value(),
          disabled: this.disabled(),
          valueText: this.valueText(),
        }),
    })
  }
}
