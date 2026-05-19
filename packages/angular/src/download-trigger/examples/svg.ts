import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkDownloadTriggerDirective } from '../public-api'
import { downloadTriggerExampleStyles } from '../download-trigger-example-styles'

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
      <div class="preview">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
        <span class="preview-text">circle.svg</span>
      </div>
      <button class="button" arkDownloadTrigger [data]="svgContent" fileName="circle.svg" mimeType="image/svg+xml">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="M7 10l5 5 5-5" />
          <path d="M12 15V3" />
        </svg>
        Download SVG
      </button>
    </div>
  `,
  styles: [downloadTriggerExampleStyles],
})
export class DownloadTriggerSvgExample {
  readonly svgContent = svgContent
}
