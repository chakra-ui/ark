import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFormatByteComponent } from '../public-api'

@Component({
  selector: 'format-byte-with-locale-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  template: `
    <div>
      @for (locale of locales; track locale) {
        <div>
          <span>{{ locale }}:</span>
          <ark-format-byte [value]="1450.45" [locale]="locale" />
        </div>
      }
    </div>
  `,
})
export class FormatByteWithLocaleExample {
  readonly locales = ['de-DE', 'zh-CN']
}
