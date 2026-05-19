import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
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
  selector: 'signature-pad-with-field-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkFieldRoot,
    ArkFieldHelperText,
    ArkFieldErrorText,
    ArkSignaturePadRoot,
    ArkSignaturePadLabel,
    ArkSignaturePadControl,
    ArkSignaturePadSegment,
    ArkSignaturePadClearTrigger,
    ArkSignaturePadGuide,
  ],
  template: `
    <div arkFieldRoot [invalid]="true">
      <div arkSignaturePad>
        <label arkSignaturePadLabel>Label</label>
        <div arkSignaturePadControl>
          <svg arkSignaturePadSegment></svg>
          <button arkSignaturePadClearTrigger>Clear</button>
          <div arkSignaturePadGuide></div>
        </div>
      </div>
      <span arkFieldHelperText>Additional Info</span>
      <span arkFieldErrorText>Error Info</span>
    </div>
  `,
  styles: [signaturePadExampleStyles],
})
export class SignaturePadWithFieldExample {}
