import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import { ArkQrCodeFrame, ArkQrCodePattern, ArkQrCodeRootProvider, useQrCode } from '../public-api'
import { qrCodeExampleStyles } from '../qr-code-example-styles'

@Component({
  selector: 'qr-code-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkQrCodeRootProvider, ArkQrCodeFrame, ArkQrCodePattern],
  template: `
    <div arkQrCodeRootProvider [value]="qrCode">
      <svg arkQrCodeFrame>
        <path arkQrCodePattern />
      </svg>
    </div>
    <output>{{ qrCode.api().value }}</output>
  `,
  styles: [qrCodeExampleStyles],
})
export class QrCodeRootProviderExample {
  private readonly injector = inject(Injector)
  readonly qrCode = runInInjectionContext(this.injector, () =>
    useQrCode({ context: () => ({ value: 'http://ark-ui.com' }) }),
  )
}
