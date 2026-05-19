import { ChangeDetectionStrategy, Component } from '@angular/core'
import { provideArkLocale } from '../public-api'

@Component({
  selector: 'locale-setup-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideArkLocale({ locale: 'ar-EG' })],
  template: `
    <p>Locale context is available to Ark UI components in this subtree.</p>
  `,
})
export class LocaleSetupExample {}
