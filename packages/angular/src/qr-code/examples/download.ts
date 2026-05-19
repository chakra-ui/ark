import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkQrCodeDownloadTrigger, ArkQrCodeFrame, ArkQrCodePattern, ArkQrCodeRoot } from '../public-api'
import { qrCodeExampleStyles } from '../qr-code-example-styles'

@Component({
  selector: 'qr-code-download-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkQrCodeRoot, ArkQrCodeFrame, ArkQrCodePattern, ArkQrCodeDownloadTrigger],
  template: `
    <div arkQrCode defaultValue="http://ark-ui.com">
      <svg arkQrCodeFrame>
        <path arkQrCodePattern />
      </svg>
      <button arkQrCodeDownloadTrigger fileName="qr-code.png" mimeType="image/png">Download</button>
    </div>
  `,
  styles: [qrCodeExampleStyles],
})
export class QrCodeDownloadExample {}
