import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkClientOnlyComponent } from '../public-api'

@Component({
  selector: 'client-only-with-fallback-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkClientOnlyComponent],
  template: `
    <ark-client-only [fallback]="fallback">
      <div>This content is only rendered on the client side.</div>
    </ark-client-only>

    <ng-template #fallback>
      <div>Loading...</div>
    </ng-template>
  `,
})
export class ClientOnlyWithFallbackExample {}
