import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFrameComponent } from '../public-api'

@Component({
  selector: 'frame-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFrameComponent],
  template: `
    <ark-frame class="frame" title="Custom Frame" [head]="frameHead">
      <div class="content">
        <h1>Hello from inside the frame!</h1>
        <p>This content is rendered within our custom frame component using a Portal.</p>
      </div>
    </ark-frame>

    <ng-template #frameHead>
      <style>
        body {
          background-color: #f0f0f0;
        }
      </style>
    </ng-template>
  `,
  styles: [
    `
      .frame {
        border: 1px solid #ccc;
        display: block;
        height: var(--height, 180px);
        width: 100%;
      }

      .content {
        padding: 40px;
      }
    `,
  ],
})
export class FrameBasicExample {}
