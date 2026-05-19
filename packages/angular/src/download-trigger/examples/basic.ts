import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkDownloadTriggerDirective } from '../public-api'
import { downloadTriggerExampleStyles } from '../download-trigger-example-styles'

const content = 'Hello, World! This is a sample text file.'

@Component({
  selector: 'download-trigger-basic-example',
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
        <span class="preview-text">{{ content }}</span>
      </div>
      <button class="button" arkDownloadTrigger [data]="content" fileName="hello.txt" mimeType="text/plain">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="M7 10l5 5 5-5" />
          <path d="M12 15V3" />
        </svg>
        Download txt
      </button>
    </div>
  `,
  styles: [downloadTriggerExampleStyles],
})
export class DownloadTriggerBasicExample {
  readonly content = content
}
