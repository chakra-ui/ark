import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkSignaturePadClearTrigger,
  ArkSignaturePadControl,
  ArkSignaturePadGuide,
  ArkSignaturePadLabel,
  ArkSignaturePadRoot,
  ArkSignaturePadSegment,
  type SignaturePadDrawEndDetails,
} from '../public-api'
import { signaturePadExampleStyles } from '../signature-pad-example-styles'

@Component({
  selector: 'signature-pad-image-preview-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkSignaturePadRoot,
    ArkSignaturePadLabel,
    ArkSignaturePadControl,
    ArkSignaturePadSegment,
    ArkSignaturePadClearTrigger,
    ArkSignaturePadGuide,
  ],
  template: `
    <div class="stack">
      <div arkSignaturePad (drawEnd)="setPreview($event)">
        <label arkSignaturePadLabel>Sign below</label>
        <div arkSignaturePadControl>
          <svg arkSignaturePadSegment></svg>
          <button arkSignaturePadClearTrigger aria-label="Clear signature">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <div arkSignaturePadGuide></div>
        </div>
      </div>

      <div class="stack">
        <span>Image Preview</span>
        @if (imageUrl()) {
          <img class="signature-pad-image" [src]="imageUrl()" alt="Signature" />
        }
      </div>
    </div>
  `,
  styles: [
    signaturePadExampleStyles,
    `
      .stack {
        display: grid;
        gap: 1rem;
      }

      span {
        color: var(--demo-neutral-fg, #1c1917);
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    `,
  ],
})
export class SignaturePadImagePreviewExample {
  readonly imageUrl = signal('')

  setPreview(details: SignaturePadDrawEndDetails): void {
    void details.getDataUrl('image/png').then((url) => this.imageUrl.set(url))
  }
}
