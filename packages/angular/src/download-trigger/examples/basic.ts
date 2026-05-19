import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkDownloadTriggerDirective } from '../public-api'

const content = 'Hello, World! This is a sample text file.'

@Component({
  selector: 'download-trigger-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkDownloadTriggerDirective],
  template: `
    <div class="root">
      <div class="preview" aria-label="Text file preview">
        <span class="icon" aria-hidden="true">TXT</span>
        <span>{{ content }}</span>
      </div>
      <button type="button" arkDownloadTrigger [data]="content" fileName="hello.txt" mimeType="text/plain">
        Download txt
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
export class DownloadTriggerBasicExample {
  readonly content = content
}
