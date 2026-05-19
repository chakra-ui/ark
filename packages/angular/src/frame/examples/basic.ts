import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFrameComponent } from '../public-api'

const srcdoc = `<html><head>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body {
    background-color: #f4f4f5;
    color: #18181b;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin: 0;
  }
  .content { padding: 40px; }
</style>
</head><body><div class="frame-root"></div></body></html>`

@Component({
  selector: 'frame-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFrameComponent],
  template: `
    <ark-frame class="frame" title="Custom Frame" [srcdoc]="srcdoc">
      <div class="content">
        <h1>Hello from inside the frame!</h1>
        <p>This content is rendered within a custom frame component.</p>
      </div>
    </ark-frame>
  `,
  styles: [
    `
      .frame {
        border: 1px solid #d4d4d8;
        border-radius: 8px;
        display: block;
        width: 100%;
        height: var(--height, 180px);
      }
    `,
  ],
})
export class FrameBasicExample {
  protected readonly srcdoc = srcdoc
}
