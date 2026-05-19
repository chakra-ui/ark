import { ChangeDetectionStrategy, Component } from '@angular/core'
import { provideArkEnvironment } from '../public-api'

@Component({
  selector: 'environment-setup-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideArkEnvironment({
      getRootNode: () => document,
    }),
  ],
  template: `
    <p>Ark UI components in this subtree resolve DOM queries from the provided root node.</p>
  `,
})
export class EnvironmentSetupExample {}
