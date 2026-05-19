import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkClipboardIndicator, ArkClipboardRoot, ArkClipboardTrigger } from '@ark-ui/angular/clipboard'
import { clipboardExampleStyles } from '../clipboard-example-styles'
import { ClipboardCheckIcon, ClipboardCopyIcon } from './icons'

@Component({
  selector: 'clipboard-with-trigger-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkClipboardRoot, ArkClipboardTrigger, ArkClipboardIndicator, ClipboardCheckIcon, ClipboardCopyIcon],
  template: `
    <div arkClipboard value="https://ark-ui.com">
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
  `,
  styles: [clipboardExampleStyles],
})
export class ClipboardWithTriggerExample {}
