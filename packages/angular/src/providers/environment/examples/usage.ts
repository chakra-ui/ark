import { ChangeDetectionStrategy, Component } from '@angular/core'
import { injectArkEnvironment } from '../public-api'

@Component({
  selector: 'environment-usage-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pre>{{ rootNodeJson }}</pre>
  `,
})
export class EnvironmentUsageExample {
  private readonly environment = injectArkEnvironment()
  protected readonly rootNodeJson = JSON.stringify(this.environment.getRootNode(), null, 2)
}
