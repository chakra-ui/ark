import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFrameComponent } from '../public-api'

const srcdoc = `<html><head>
<link href="//use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
<link href="//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet" type="text/css" />
<base target="_blank">
</head><body style="overflow: hidden"><div class="frame-root"></div></body></html>`

@Component({
  selector: 'frame-src-doc-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFrameComponent],
  template: `
    <ark-frame class="frame" title="Custom Frame" [srcdoc]="srcdoc">
      <h1 style="font-family: 'Open Sans', sans-serif">Hello from inside the frame!</h1>
      <p>This content is rendered within a custom frame component.</p>
      <p>The frame has custom initial content, including Font Awesome and Open Sans font.</p>
    </ark-frame>
  `,
  styles: [
    `
      .frame {
        border: 1px solid #d4d4d8;
        border-radius: 8px;
        display: block;
        max-width: 800px;
        width: 100%;
        height: var(--height, 180px);
      }
    `,
  ],
})
export class FrameSrcDocExample {
  protected readonly srcdoc = srcdoc
}
