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
import type * as qrCode from '@zag-js/qr-code'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { applyQrCodeRootStyles } from './qr-code-root-styles'
import { ARK_QR_CODE_CONTEXT } from './use-qr-code-context'
import type { UseQrCodeReturn } from './use-qr-code'

@Directive({
  selector: '[arkQrCodeRootProvider]',
  standalone: true,
  exportAs: 'arkQrCodeRootProvider',
  providers: [{ provide: ARK_QR_CODE_CONTEXT, useExisting: forwardRef(() => ArkQrCodeRootProvider) }],
})
export class ArkQrCodeRootProvider implements UseQrCodeReturn {
  /** The QR code machine returned by useQrCode(). */
  readonly value: InputSignal<UseQrCodeReturn> = input.required<UseQrCodeReturn>()
  readonly state: Signal<qrCode.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<qrCode.Api> = computed(() => this.value().api())
  readonly send: qrCode.Service['send'] = (event) => this.value().send(event)

  get service(): qrCode.Service {
    return this.value().service
  }

  constructor() {
    const elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
    const renderer = inject(Renderer2)
    const destroyRef = inject(DestroyRef)
    applyArkProps({
      elementRef,
      renderer,
      destroyRef,
      props: () => this.api().getRootProps(),
    })
    applyQrCodeRootStyles(elementRef, renderer, destroyRef, () => this.api().getRootProps() as Record<string, unknown>)
  }
}
