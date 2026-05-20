import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkQrCodeFrame, ArkQrCodePattern, ArkQrCodeRoot } from '../public-api'
import { qrCodeExampleStyles } from '../qr-code-example-styles'

@Component({
  selector: 'qr-code-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkQrCodeRoot, ArkQrCodeFrame, ArkQrCodePattern],
  template: `
    <div class="stack">
      <div arkQrCode [(value)]="value">
        <svg arkQrCodeFrame>
          <path arkQrCodePattern />
        </svg>
      </div>
      <button class="button" type="button" (click)="value.set('https://chakra-ui.com')">Set to chakra-ui.com</button>
    </div>
  `,
  styles: [qrCodeExampleStyles],
})
export class QrCodeControlledExample {
  readonly value = signal('http://ark-ui.com')
}
