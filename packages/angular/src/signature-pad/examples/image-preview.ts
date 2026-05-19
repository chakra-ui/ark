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

      @if (imageUrl()) {
        <img [src]="imageUrl()" alt="Signature" />
      }
    </div>
  `,
  styles: [
    signaturePadExampleStyles,
    `
      .stack {
        display: grid;
        gap: 1rem;
      }

      img {
        width: min(100%, 28rem);
        border: 1px solid var(--demo-border, #d6d3d1);
        border-radius: 0.5rem;
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
