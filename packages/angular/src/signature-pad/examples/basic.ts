import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSignaturePadClearTrigger,
  ArkSignaturePadControl,
  ArkSignaturePadGuide,
  ArkSignaturePadLabel,
  ArkSignaturePadRoot,
  ArkSignaturePadSegment,
} from '../public-api'
import { signaturePadExampleStyles } from '../signature-pad-example-styles'

@Component({
  selector: 'signature-pad-basic-example',
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
    <div arkSignaturePad>
      <label arkSignaturePadLabel>Sign below</label>
      <div arkSignaturePadControl>
        <svg arkSignaturePadSegment></svg>
        <button arkSignaturePadClearTrigger>Clear</button>
        <div arkSignaturePadGuide></div>
      </div>
    </div>
  `,
  styles: [signaturePadExampleStyles],
})
export class SignaturePadBasicExample {}
