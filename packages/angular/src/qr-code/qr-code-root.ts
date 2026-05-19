import type * as qrCode from '@zag-js/qr-code'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  forwardRef,
  inject,
  input,
  model,
  type InputSignal,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { QrCodeElementIds, QrCodeGenerateOptions } from './qr-code.types'
import { applyQrCodeRootStyles } from './qr-code-root-styles'
import { ARK_QR_CODE_CONTEXT } from './use-qr-code-context'
import { useQrCode, type UseQrCodeReturn } from './use-qr-code'

@Directive({
  selector: '[arkQrCode]',
  standalone: true,
  exportAs: 'arkQrCode',
  providers: [{ provide: ARK_QR_CODE_CONTEXT, useExisting: forwardRef(() => ArkQrCodeRoot) }],
})
export class ArkQrCodeRoot implements UseQrCodeReturn {
  /** The unique identifier of the QR code. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the QR code elements. Useful for composition. */
  readonly ids: InputSignal<Partial<QrCodeElementIds> | undefined> = input<Partial<QrCodeElementIds> | undefined>(
    undefined,
  )
  /** The controlled value to encode. */
  readonly value: ModelSignal<string | undefined> = model<string | undefined>(undefined)
  /** The initial value to encode when uncontrolled. */
  readonly defaultValue: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The QR code encoding options. */
  readonly encoding: InputSignal<QrCodeGenerateOptions | undefined> = input<QrCodeGenerateOptions | undefined>(
    undefined,
  )
  /** The pixel size of the QR code. */
  readonly pixelSize: InputSignal<number | undefined> = input<number | undefined>(undefined)

  private readonly machine = useQrCode({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      encoding: this.encoding(),
      pixelSize: this.pixelSize(),
      onValueChange: (details) => {
        if (this.value() === details.value) return
        this.value.set(details.value)
      },
    }),
  })

  readonly state: Signal<qrCode.Service['state']> = this.machine.state
  readonly api: Signal<qrCode.Api> = this.machine.api
  readonly service: qrCode.Service = this.machine.service
  readonly send: qrCode.Service['send'] = this.machine.send

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
