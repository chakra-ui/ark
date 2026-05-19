import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkClipboardContext, ArkClipboardLabel, ArkClipboardRoot } from '@ark-ui/angular/clipboard'
import { clipboardExampleStyles } from '../clipboard-example-styles'
import { ClipboardCheckIcon, ClipboardCopyIcon } from './icons'

@Component({
  selector: 'clipboard-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkClipboardRoot, ArkClipboardLabel, ArkClipboardContext, ClipboardCheckIcon, ClipboardCopyIcon],
  template: `
    <div arkClipboard value="https://ark-ui.com">
      <label arkClipboardLabel>Copy this link</label>
      <ng-template arkClipboardContext let-clipboard="api">
        <button type="button" class="button" (click)="clipboard().copy()">
          @if (clipboard().copied) {
            <clipboard-check-icon />
            Copied!
          } @else {
            <clipboard-copy-icon />
            Copy
          }
        </button>
      </ng-template>
    </div>
  `,
  styles: [clipboardExampleStyles],
})
export class ClipboardContextExample {}
