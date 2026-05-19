import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkQrCodeFrame, ArkQrCodePattern, ArkQrCodeRoot } from '../public-api'
import { qrCodeExampleStyles } from '../qr-code-example-styles'

@Component({
  selector: 'qr-code-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkQrCodeRoot, ArkQrCodeFrame, ArkQrCodePattern],
  template: `
    <div arkQrCode defaultValue="http://ark-ui.com">
      <svg arkQrCodeFrame>
        <path arkQrCodePattern />
      </svg>
    </div>
  `,
  styles: [qrCodeExampleStyles],
})
export class QrCodeBasicExample {}
