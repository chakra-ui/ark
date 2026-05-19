import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkQrCodeFrame, ArkQrCodeOverlay, ArkQrCodePattern, ArkQrCodeRoot } from '../public-api'
import { qrCodeExampleStyles } from '../qr-code-example-styles'

@Component({
  selector: 'qr-code-overlay-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkQrCodeRoot, ArkQrCodeFrame, ArkQrCodePattern, ArkQrCodeOverlay],
  template: `
    <div arkQrCode defaultValue="http://ark-ui.com" [encoding]="{ ecc: 'H' }">
      <svg arkQrCodeFrame>
        <path arkQrCodePattern />
      </svg>
      <div arkQrCodeOverlay>Ark</div>
    </div>
  `,
  styles: [qrCodeExampleStyles],
})
export class QrCodeOverlayExample {}
