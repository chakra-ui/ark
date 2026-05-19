import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkClipboardControl,
  ArkClipboardIndicator,
  ArkClipboardRoot,
  ArkClipboardTrigger,
  ArkClipboardValueText,
  type ClipboardCopyStatusDetails,
} from '@ark-ui/angular/clipboard'
import { clipboardExampleStyles } from '../clipboard-example-styles'
import { ClipboardCheckIcon, ClipboardCopyIcon } from './icons'

@Component({
  selector: 'clipboard-copy-status-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkClipboardRoot,
    ArkClipboardControl,
    ArkClipboardTrigger,
    ArkClipboardIndicator,
    ArkClipboardValueText,
    ClipboardCheckIcon,
    ClipboardCopyIcon,
  ],
  template: `
    <div arkClipboard value="https://ark-ui.com" (statusChange)="onStatusChange($event)">
      <div arkClipboardControl>
        <button arkClipboardTrigger>
          <span arkClipboardIndicator #indicator="arkClipboardIndicator">
            @if (indicator.copied()) {
              <clipboard-check-icon />
            } @else {
              <clipboard-copy-icon />
            }
          </span>
          <span arkClipboardValueText #valueText="arkClipboardValueText">{{ valueText.value() }}</span>
        </button>
      </div>
      <p>Copied {{ copyCount() }} times</p>
    </div>
  `,
  styles: [clipboardExampleStyles],
})
export class ClipboardCopyStatusExample {
  readonly copyCount = signal(0)

  onStatusChange(details: ClipboardCopyStatusDetails): void {
    if (details.copied) {
      this.copyCount.update((count) => count + 1)
    }
  }
}
