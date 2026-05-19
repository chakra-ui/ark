import { DOCUMENT } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core'
import { ArkFrameComponent } from '../public-api'

@Component({
  selector: 'frame-inherit-styles-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFrameComponent],
  template: `
    <ark-frame #frame class="frame" title="Inherited Styles Frame" (mount)="inheritStyles()">
      <h1>Ark UI / Frame</h1>
      <p>This is an Angular component wrapped in an iframe.</p>
    </ark-frame>
  `,
  styles: [
    `
      :host {
        color: #27272a;
        font-family:
          Inter,
          ui-sans-serif,
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          sans-serif;
        line-height: 1.5;
      }

      .frame {
        border: 1px solid #ccc;
        display: block;
        width: 100%;
        height: var(--height, 160px);
      }

      p {
        margin-bottom: 10px;
        margin-top: 4px;
      }
    `,
  ],
})
export class FrameInheritStylesExample {
  private readonly document = inject(DOCUMENT)
  private readonly frame = viewChild.required(ArkFrameComponent)

  inheritStyles(): void {
    const head = this.frame().frameElement().nativeElement.contentDocument?.head
    if (!head) return

    const styles = this.document.head.querySelectorAll('style, link[rel="stylesheet"]')
    for (const style of Array.from(styles)) {
      head.appendChild(style.cloneNode(true))
    }
  }
}
