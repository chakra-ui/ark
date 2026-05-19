import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  type InputSignal,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import type * as signaturePad from '@zag-js/signature-pad'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_SIGNATURE_PAD_CONTEXT } from './use-signature-pad-context'
import type { UseSignaturePadReturn } from './use-signature-pad'

@Directive({
  selector: '[arkSignaturePadRootProvider]',
  standalone: true,
  exportAs: 'arkSignaturePadRootProvider',
  providers: [{ provide: ARK_SIGNATURE_PAD_CONTEXT, useExisting: forwardRef(() => ArkSignaturePadRootProvider) }],
})
export class ArkSignaturePadRootProvider implements UseSignaturePadReturn {
  /** The signature pad machine returned by useSignaturePad(). */
  readonly value: InputSignal<UseSignaturePadReturn> = input.required<UseSignaturePadReturn>()
  readonly state: Signal<signaturePad.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<signaturePad.Api> = computed(() => this.value().api())
  readonly send: signaturePad.Service['send'] = (event) => this.value().send(event)

  get service(): signaturePad.Service {
    return this.value().service
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
