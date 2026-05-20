import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFrameComponent } from '@ark-ui/angular/frame'
import { EnvironmentUsageExample } from './usage'

@Component({
  selector: 'environment-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFrameComponent, EnvironmentUsageExample],
  template: `
    <ark-frame class="frame" title="IFrame Context">
      <environment-usage-example />
    </ark-frame>
  `,
  styles: [
    `
      .frame {
        display: block;
        height: 300px;
        width: 100%;
      }
    `,
  ],
})
export class EnvironmentBasicExample {}
