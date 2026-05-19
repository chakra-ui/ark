import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { injectArkComboboxContext } from './use-combobox-context'

@Directive({
  selector: '[arkComboboxTrigger]',
  standalone: true,
  exportAs: 'arkComboboxTrigger',
})
export class ArkComboboxTrigger {
  /** Whether the trigger is focusable. */
  readonly focusable: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: (value: unknown) => (value === undefined || value === null ? undefined : booleanAttribute(value)) },
  )

  constructor() {
    const context = injectArkComboboxContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => context.api().getTriggerProps({ focusable: this.focusable() }),
    })
  }
}
