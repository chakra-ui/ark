import { ChangeDetectionStrategy, Component } from '@angular/core'
import { provideArkLocale } from '../../providers/locale/locale'
import { ArkFormatByteComponent } from '../public-api'
import { formatExampleStyles } from '../format-example-styles'

@Component({
  selector: 'format-byte-de-locale-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  providers: [provideArkLocale({ locale: 'de-DE' })],
  template: `
    <ark-format-byte [value]="1450.45" />
  `,
})
class FormatByteDeLocaleExample {}

@Component({
  selector: 'format-byte-zh-locale-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFormatByteComponent],
  providers: [provideArkLocale({ locale: 'zh-CN' })],
  template: `
    <ark-format-byte [value]="1450.45" />
  `,
})
class FormatByteZhLocaleExample {}

@Component({
  selector: 'format-byte-with-locale-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormatByteDeLocaleExample, FormatByteZhLocaleExample],
  styles: [formatExampleStyles],
  template: `
    <div class="List">
      <div class="ListItem">
        <span class="InlineLabel">de-DE:</span>
        <span class="Value">
          <format-byte-de-locale-example />
        </span>
      </div>
      <div class="ListItem">
        <span class="InlineLabel">zh-CN:</span>
        <span class="Value">
          <format-byte-zh-locale-example />
        </span>
      </div>
    </div>
  `,
})
export class FormatByteWithLocaleExample {}
