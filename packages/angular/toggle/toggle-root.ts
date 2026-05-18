import type * as toggle from '@zag-js/toggle'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  type InputSignalWithTransform,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_TOGGLE_CONTEXT } from './use-toggle-context'
import { useToggle, type UseToggleReturn } from './use-toggle'

@Directive({
  selector: '[arkToggle]',
  standalone: true,
  exportAs: 'arkToggle',
  providers: [{ provide: ARK_TOGGLE_CONTEXT, useExisting: forwardRef(() => ArkToggleRoot) }],
})
export class ArkToggleRoot implements UseToggleReturn {
  /** Whether the toggle is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The controlled pressed state of the toggle. */
  readonly pressed: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial pressed state of the toggle when uncontrolled. */
  readonly defaultPressed: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })

  private readonly machine = useToggle({
    context: () => ({
      disabled: this.disabled(),
      pressed: this.pressed(),
      defaultPressed: this.defaultPressed(),
      onPressedChange: (p) => this.pressed.set(p),
    }),
  })

  readonly state: Signal<toggle.Service['state']> = this.machine.state
  readonly api: Signal<toggle.Api> = this.machine.api
  readonly service: toggle.Service = this.machine.service
  readonly send: toggle.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
