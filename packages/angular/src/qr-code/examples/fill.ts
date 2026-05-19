import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkQrCodeFrame, ArkQrCodePattern, ArkQrCodeRoot } from '../public-api'
import { qrCodeExampleStyles } from '../qr-code-example-styles'

@Component({
  selector: 'qr-code-fill-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkQrCodeRoot, ArkQrCodeFrame, ArkQrCodePattern],
  template: `
    <div class="hstack">
      @for (fill of fills; track fill) {
        <div arkQrCode defaultValue="http://ark-ui.com">
          <svg class="fill-frame" arkQrCodeFrame [style.--qr-code-fill]="fill">
            <path arkQrCodePattern />
          </svg>
        </div>
      }
    </div>
  `,
  styles: [qrCodeExampleStyles],
})
export class QrCodeFillExample {
  readonly fills = ['#5417D7', '#EC5D5E']
}
