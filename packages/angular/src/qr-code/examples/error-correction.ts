import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkQrCodeFrame, ArkQrCodePattern, ArkQrCodeRoot, type QrCodeGenerateOptions } from '../public-api'
import { qrCodeExampleStyles } from '../qr-code-example-styles'

type ErrorLevel = NonNullable<QrCodeGenerateOptions['ecc']>

@Component({
  selector: 'qr-code-error-correction-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkQrCodeRoot, ArkQrCodeFrame, ArkQrCodePattern],
  template: `
    <div class="stack">
      <div arkQrCode defaultValue="http://ark-ui.com" [encoding]="{ ecc: errorLevel() }">
        <svg arkQrCodeFrame>
          <path arkQrCodePattern />
        </svg>
      </div>

      <div class="hstack" role="radiogroup" aria-label="Error correction">
        @for (level of errorLevels; track level) {
          <label class="radio-item">
            <input
              class="radio-input"
              type="radio"
              name="qr-code-error-correction"
              [value]="level"
              [checked]="errorLevel() === level"
              (change)="errorLevel.set(level)"
            />
            <span class="radio-control" aria-hidden="true"></span>
            <span>{{ level }}</span>
          </label>
        }
      </div>
    </div>
  `,
  styles: [qrCodeExampleStyles],
})
export class QrCodeErrorCorrectionExample {
  readonly errorLevels: ErrorLevel[] = ['L', 'M', 'Q', 'H']
  readonly errorLevel = signal<ErrorLevel>('L')
}
