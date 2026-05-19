import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkClipboardControl,
  ArkClipboardIndicator,
  ArkClipboardRoot,
  ArkClipboardTrigger,
  ArkClipboardValueText,
} from '@ark-ui/angular/clipboard'
import { clipboardExampleStyles } from '../clipboard-example-styles'
import { ClipboardCheckIcon, ClipboardCopyIcon } from './icons'

@Component({
  selector: 'clipboard-value-text-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkClipboardRoot,
    ArkClipboardControl,
    ArkClipboardValueText,
    ArkClipboardTrigger,
    ArkClipboardIndicator,
    ClipboardCheckIcon,
    ClipboardCopyIcon,
  ],
  template: `
    <div arkClipboard value="https://ark-ui.com">
      <div arkClipboardControl>
        <span arkClipboardValueText #valueText="arkClipboardValueText">{{ valueText.value() }}</span>
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
export class ClipboardValueTextExample {}
