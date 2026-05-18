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
  selector: '[arkMenuItem]',
  standalone: true,
  exportAs: 'arkMenuItem',
})
export class ArkMenuItem {
  /** The unique value of the menu item option. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Whether the menu item is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The textual value of the option. Used in typeahead navigation. */
  readonly valueText: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the menu should be closed when the option is selected. */
  readonly closeOnSelect: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)

  constructor() {
    const context = injectArkMenuContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getItemProps({
          value: this.value(),
          disabled: this.disabled(),
          valueText: this.valueText(),
          closeOnSelect: this.closeOnSelect(),
        }),
    })
  }
}
