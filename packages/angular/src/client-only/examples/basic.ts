import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkClientOnlyComponent } from '../public-api'

@Component({
  selector: 'client-only-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkClientOnlyComponent],
  template: `
    <ark-client-only>
      <div>This content is only rendered on the client side.</div>
    </ark-client-only>
  `,
})
export class ClientOnlyBasicExample {}
