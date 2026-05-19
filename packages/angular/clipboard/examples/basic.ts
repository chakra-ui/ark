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
  selector: 'clipboard-basic-example',
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
    <div arkClipboard value="https://ark-ui.com">
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
  `,
  styles: [clipboardExampleStyles],
})
export class ClipboardBasicExample {}
