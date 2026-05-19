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
import { injectArkTabsContext } from './use-tabs-context'

@Directive({
  selector: '[arkTabsTrigger]',
  standalone: true,
  exportAs: 'arkTabsTrigger',
})
export class ArkTabsTrigger {
  /** The unique value of the tab. */
  readonly value: InputSignal<string> = input.required<string>()
  /** Whether the tab is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  constructor() {
    const context = injectArkTabsContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () =>
        context.api().getTriggerProps({
          value: this.value(),
          disabled: this.disabled(),
        }),
    })
  }
}
