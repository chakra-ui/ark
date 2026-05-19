import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkDownloadTriggerDirective } from '../public-api'

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/>
</svg>`

@Component({
  selector: 'download-trigger-svg-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkDownloadTriggerDirective],
  template: `
    <div class="root">
      <div class="preview" aria-label="SVG file preview">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
        </svg>
        <span>circle.svg</span>
      </div>
      <button type="button" arkDownloadTrigger [data]="svgContent" fileName="circle.svg" mimeType="image/svg+xml">
        Download SVG
      </button>
    </div>
  `,
  styles: [
    `
      .root {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
      }

      .preview {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border: 1px solid #d4d4d8;
        border-radius: 8px;
        color: #18181b;
      }

      svg {
        width: 48px;
        height: 48px;
      }

      button {
        border: 0;
        border-radius: 6px;
        background: #18181b;
        color: white;
        font: inherit;
        font-weight: 500;
        padding: 10px 14px;
        cursor: pointer;
      }
    `,
  ],
})
export class DownloadTriggerSvgExample {
  readonly svgContent = svgContent
}
