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
    <div class="stack">
      <output>no of paths: {{ signaturePad.api().paths.length }}</output>
      <div arkSignaturePadRootProvider [value]="signaturePad">
        <label arkSignaturePadLabel>Sign below</label>
        <div arkSignaturePadControl>
          <svg arkSignaturePadSegment></svg>
          <button arkSignaturePadClearTrigger>Clear</button>
          <div arkSignaturePadGuide></div>
        </div>
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

      output {
        color: var(--demo-neutral-fg, #1c1917);
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    `,
  ],
})
export class SignaturePadRootProviderExample {
  private readonly injector = inject(Injector)
  readonly signaturePad = runInInjectionContext(this.injector, () => useSignaturePad({ context: () => ({}) }))
}
