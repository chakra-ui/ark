import { ChangeDetectionStrategy, Component } from '@angular/core'
import { injectArkEnvironment } from '../public-api'

@Component({
  selector: 'environment-usage-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Root node: {{ rootNodeName }}</p>
  `,
})
export class EnvironmentUsageExample {
  private readonly environment = injectArkEnvironment()
  protected readonly rootNodeName = this.environment.getRootNode()?.nodeName ?? 'Unavailable'
}
