import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkDownloadTriggerDirective, type DownloadableData } from '../public-api'
import { downloadTriggerExampleStyles } from '../download-trigger-example-styles'

@Component({
  selector: 'download-trigger-with-promise-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkDownloadTriggerDirective],
  template: `
    <div class="root">
      <div class="preview">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        <span class="preview-text">random-image.jpg (fetched on download)</span>
      </div>
      <button class="button" arkDownloadTrigger [data]="fetchImage" fileName="random-image.jpg" mimeType="image/jpeg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="M7 10l5 5 5-5" />
          <path d="M12 15V3" />
        </svg>
        Download Image
      </button>
    </div>
  `,
  styles: [downloadTriggerExampleStyles],
})
export class DownloadTriggerWithPromiseExample {
  readonly fetchImage = async (): Promise<DownloadableData> => {
    const response = await fetch('https://picsum.photos/200/300')
    return response.blob()
  }
}
