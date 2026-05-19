import type * as pinInput from '@zag-js/pin-input'
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
import {
  ARK_PIN_INPUT_CONTEXT,
  ARK_PIN_INPUT_COUNT_REGISTRAR,
  type PinInputCountRegistrar,
} from './use-pin-input-context'
import type { UsePinInputReturn } from './use-pin-input'

@Directive({
  selector: '[arkPinInputRootProvider]',
  standalone: true,
  exportAs: 'arkPinInputRootProvider',
  providers: [
    { provide: ARK_PIN_INPUT_CONTEXT, useExisting: forwardRef(() => ArkPinInputRootProvider) },
    { provide: ARK_PIN_INPUT_COUNT_REGISTRAR, useExisting: forwardRef(() => ArkPinInputRootProvider) },
  ],
})
export class ArkPinInputRootProvider implements UsePinInputReturn, PinInputCountRegistrar {
  /** The pin input primitive returned by usePinInput(). */
  readonly value: InputSignal<UsePinInputReturn> = input.required<UsePinInputReturn>()

  private readonly _registeredIndices = new Set<number>()

  get state(): Signal<pinInput.Service['state']> {
    return this.value().state
  }
  get api(): Signal<pinInput.Api> {
    return this.value().api
  }
  get service(): pinInput.Service {
    return this.value().service
  }
  get send(): pinInput.Service['send'] {
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

  register(index: number): () => void {
    this._registeredIndices.add(index)
    this._syncCount()
    return () => {
      this._registeredIndices.delete(index)
      this._syncCount()
    }
  }

  private _syncCount(): void {
    const next = this._registeredIndices.size
    if (next === 0) return
    const ctx = this.service.context as { get: (k: string) => unknown; set: (k: string, v: unknown) => void }
    if (ctx.get('count') !== next) {
      ctx.set('count', next)
    }
  }
}
