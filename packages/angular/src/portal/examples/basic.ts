import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkPortalComponent } from '../public-api'

@Component({
  selector: 'portal-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkPortalComponent],
  template: `
    <ark-portal>
      <div>Portalled content</div>
    </ark-portal>
  `,
})
export class PortalBasicExample {}
