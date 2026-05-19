import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkClipboardControl,
  ArkClipboardIndicator,
  ArkClipboardInput,
  ArkClipboardLabel,
  ArkClipboardRoot,
  ArkClipboardTrigger,
} from '@ark-ui/angular/clipboard'
import { clipboardExampleStyles } from '../clipboard-example-styles'
import { ClipboardCheckIcon, ClipboardCopyIcon } from './icons'

@Component({
  selector: 'clipboard-timeout-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkClipboardRoot,
    ArkClipboardLabel,
    ArkClipboardControl,
    ArkClipboardInput,
    ArkClipboardTrigger,
    ArkClipboardIndicator,
    ClipboardCheckIcon,
    ClipboardCopyIcon,
  ],
  template: `
    <div arkClipboard value="https://ark-ui.com" [timeout]="5000">
      <label arkClipboardLabel>Copy this link (5 second timeout)</label>
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
  `,
  styles: [clipboardExampleStyles],
})
export class ClipboardTimeoutExample {}
