import type * as zagSwitch from '@zag-js/switch'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_SWITCH_CONTEXT } from './use-switch-context'
import type { UseSwitchReturn } from './use-switch'

@Directive({
  selector: '[arkSwitchRootProvider]',
  standalone: true,
  exportAs: 'arkSwitchRootProvider',
  providers: [{ provide: ARK_SWITCH_CONTEXT, useExisting: forwardRef(() => ArkSwitchRootProvider) }],
})
export class ArkSwitchRootProvider implements UseSwitchReturn {
  readonly value: InputSignal<UseSwitchReturn> = input.required<UseSwitchReturn>()

  get state(): Signal<zagSwitch.Service['state']> {
    return this.value().state
  }
  get api(): Signal<zagSwitch.Api> {
    return this.value().api
  }
  get service(): zagSwitch.Service {
    return this.value().service
  }
  get send(): zagSwitch.Service['send'] {
    return this.value().send
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.value().api().getRootProps(),
    })
  }
}
