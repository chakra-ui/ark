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
          <button arkSignaturePadClearTrigger>Clear</button>
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
