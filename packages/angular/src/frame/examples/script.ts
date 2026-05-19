import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core'
import { ArkFrameComponent } from '../public-api'

@Component({
  selector: 'frame-script-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFrameComponent],
  template: `
    <ark-frame #frame class="frame" title="Custom Frame" (mount)="appendScript()">
      <div class="content">
        <h1>Hello from inside the frame!</h1>
        <p>This content is rendered within our custom frame component using a Portal.</p>
      </div>
    </ark-frame>
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
export class FrameScriptExample {
  private readonly frame = viewChild.required(ArkFrameComponent)

  appendScript(): void {
    const doc = this.frame().frameElement().nativeElement.contentDocument
    if (!doc) return

    const script = doc.createElement('script')
    script.textContent = 'console.log("Hello from inside the frame!")'
    doc.body.appendChild(script)
  }
}
