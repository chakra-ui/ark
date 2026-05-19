import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkClipboardControl,
  ArkClipboardIndicator,
  ArkClipboardInput,
  ArkClipboardLabel,
  ArkClipboardRootProvider,
  ArkClipboardTrigger,
  useClipboard,
} from '@ark-ui/angular/clipboard'
import { clipboardExampleStyles } from '../clipboard-example-styles'
import { ClipboardCheckIcon, ClipboardCopyIcon } from './icons'

@Component({
  selector: 'clipboard-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkClipboardRootProvider,
    ArkClipboardLabel,
    ArkClipboardControl,
    ArkClipboardInput,
    ArkClipboardTrigger,
    ArkClipboardIndicator,
    ClipboardCheckIcon,
    ClipboardCopyIcon,
  ],
  template: `
    <div class="stack">
      <output>value: {{ clipboard.api().value }}, copied: {{ clipboard.api().copied }}</output>
      <div arkClipboardRootProvider [value]="clipboard">
        <label arkClipboardLabel>Copy this link</label>
        <div arkClipboardControl>
          <input arkClipboardInput />
          <button arkClipboardTrigger>
            <span arkClipboardIndicator #indicator="arkClipboardIndicator">
              @if (indicator.copied()) {
                <clipboard-check-icon />
              } @else {
                <clipboard-copy-icon />
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [clipboardExampleStyles],
})
export class ClipboardRootProviderExample {
  readonly clipboard = useClipboard({ context: () => ({ value: 'https://ark-ui.com' }) })
}
