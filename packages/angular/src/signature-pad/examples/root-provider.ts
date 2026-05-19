import { ChangeDetectionStrategy, Component, Injector, runInInjectionContext, inject } from '@angular/core'
import {
  ArkSignaturePadClearTrigger,
  ArkSignaturePadControl,
  ArkSignaturePadGuide,
  ArkSignaturePadLabel,
  ArkSignaturePadRootProvider,
  ArkSignaturePadSegment,
  useSignaturePad,
} from '../public-api'
import { signaturePadExampleStyles } from '../signature-pad-example-styles'

@Component({
  selector: 'signature-pad-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkSignaturePadRootProvider,
    ArkSignaturePadLabel,
    ArkSignaturePadControl,
    ArkSignaturePadSegment,
    ArkSignaturePadClearTrigger,
    ArkSignaturePadGuide,
  ],
  template: `
    <div arkSignaturePadRootProvider [value]="signaturePad">
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
export class SignaturePadRootProviderExample {
  private readonly injector = inject(Injector)
  readonly signaturePad = runInInjectionContext(this.injector, () => useSignaturePad({ context: () => ({}) }))
}
