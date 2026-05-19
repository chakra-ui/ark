import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkDownloadTriggerDirective, type DownloadableData } from '../public-api'

@Component({
  selector: 'download-trigger-with-promise-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkDownloadTriggerDirective],
  template: `
    <div class="root">
      <div class="preview" aria-label="Async image download preview">
        <span class="icon" aria-hidden="true">IMG</span>
        <span>random-image.jpg (fetched on download)</span>
      </div>
      <button type="button" arkDownloadTrigger [data]="fetchImage" fileName="random-image.jpg" mimeType="image/jpeg">
        Download Image
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
        max-width: 360px;
      }

      .icon {
        display: inline-grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 6px;
        background: #f4f4f5;
        font-size: 12px;
        font-weight: 600;
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
export class DownloadTriggerWithPromiseExample {
  readonly fetchImage = async (): Promise<DownloadableData> => {
    const response = await fetch('https://picsum.photos/200/300')
    return response.blob()
  }
}
