import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core'
import { ArkFrameComponent } from '../public-api'

@Component({
  selector: 'frame-script-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFrameComponent],
  template: `
    <ark-frame #frame class="frame" title="Script Frame" (mount)="appendScript()">
      <div class="content">
        <h1>Hello from inside the frame!</h1>
        <p>This frame appends a script after the iframe document mounts.</p>
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
